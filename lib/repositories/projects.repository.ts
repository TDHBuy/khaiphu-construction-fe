import { createClient } from "../supabase/server";
import { Database } from "../types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
// -- Generated types -----------------------------
type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

// -- Constants ----------------------
const TABLE = "projects" as const;
const SELECT_FIELDS = `
id, slug,
  title_vi, title_en,
  description_vi, description_en,
  service_type, location, location_en,
  main_contractor, main_contractor_en,
  general_contractor, general_contractor_en,
  specifications, specifications_en,
  status, is_featured, year,
  created_at, updated_at,
  project_images(
  id,url,"order",is_cover,alt_text)` as const;

// -- Error handling ----------------------
async function handleError<T>(
  fn: () => PromiseLike<{ data: T | null; error: unknown }>,
): Promise<T> {
  const { data, error } = await fn();
  if (error) {
    console.error("Database error:", error);
    throw new Error("Database operation failed");
  }
  return data as T;
}

// -- Base query -----------------------
function baseQuery(supabase: SupabaseClient<Database>) {
  return supabase.from(TABLE).select(SELECT_FIELDS);
}

// -- Repository functions ----------------
export const ProjectsRepository = {
  async getAll() {
    const supabase = await createClient();
    return handleError(() => baseQuery(supabase));
  },

  async findBySlug(slug: string) {
    const supabase = await createClient();
    return handleError(() => baseQuery(supabase).eq("slug", slug).single());
  },

  async findByServiceType(serviceType: ProjectRow["service_type"][number]) {
    const supabase = await createClient();
    return handleError(() =>
      baseQuery(supabase).contains("service_type", [serviceType]),
    );
  },

  async findFeatured(limit?: number) {
    const supabase = await createClient();
    const query = baseQuery(supabase)
      .eq("is_featured", true)
      .order("created_at", { ascending: false });
    return handleError(limit ? () => query.limit(limit) : () => query);
  },

  async create(payload: ProjectInsert) {
    const supabase = await createClient();
    return handleError(() => supabase.from(TABLE).insert(payload).select());
  },

  async update(id: number, payload: ProjectUpdate) {
    const supabase = await createClient();
    return handleError(() =>
      supabase.from(TABLE).update(payload).eq("id", id).select().single(),
    );
  },
};
