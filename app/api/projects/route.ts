import { NextResponse } from "next/server";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const serviceTypeSchema = z.enum(["shoring", "larsen", "kingpost"]);
const specificationUnitSchema = z.enum(["ton", "pcs", "m", "m2", "m3", "kg"]);

const projectSchema = z.object({
  slug: z.string().trim().min(1).max(200),
  service_type: z.array(serviceTypeSchema).min(1),
  is_featured: z.boolean().optional(),
  is_published: z.boolean().optional(),
  location_ref: z.number().int().nonnegative().optional(),
  status: z.enum(["completed", "ongoing", "planned"]).nullable().optional(),
  year: z.number().int().min(1900).max(2200).nullable().optional(),
});

const imageSchema = z.object({
  url: z.string().url().max(2048),
  alt_text: z.string().trim().max(500).nullable().optional(),
  is_cover: z.boolean().optional(),
  order: z.number().finite().optional(),
});

const specificationSchema = z.object({
  code: z.string().trim().min(1).max(100),
  display_order: z.number().int().nonnegative(),
  quantity: z.number().finite().nonnegative(),
  unit: specificationUnitSchema,
});

const createProjectSchema = z.object({
  project: projectSchema,
  images: z.array(imageSchema).max(100).optional().default([]),
  specifications: z.array(specificationSchema).max(100).optional().default([]),
});

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Request body must be valid JSON", 400);
  }

  const parsed = createProjectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid project payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return errorResponse("Authentication required", 401);
  }

  const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin");
  if (roleError || !isAdmin) {
    return errorResponse("Admin access required", 403);
  }

  const { project, images, specifications } = parsed.data;
  const { data: createdProject, error: projectError } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (projectError || !createdProject) {
    if (projectError?.code === "23505") {
      return errorResponse("A project with this slug already exists", 409);
    }
    return errorResponse("Failed to create project", 500);
  }

  const { data: createdImages, error: imagesError } = images.length
    ? await supabase
        .from("project_images")
        .insert(images.map((image) => ({ ...image, project_id: createdProject.id })))
        .select()
    : { data: [], error: null };

  const { data: createdSpecifications, error: specificationsError } =
    specifications.length
      ? await supabase
          .from("project_specifications")
          .insert(
            specifications.map((specification) => ({
              ...specification,
              project_id: createdProject.id,
            })),
          )
          .select()
      : { data: [], error: null };

  if (imagesError || specificationsError) {
    await supabase.from("projects").delete().eq("id", createdProject.id);
    return errorResponse("Failed to create project details", 500);
  }

  return NextResponse.json(
    {
      data: {
        project: createdProject,
        images: createdImages,
        specifications: createdSpecifications,
      },
    },
    { status: 201 },
  );
}
