import { createClient } from "../lib/supabase/server";
import { Database } from "../types/database";
import { SupabaseClient } from "@supabase/supabase-js";
// -- Generated types -----------------------------
type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

// Client is injected, not created here — the service layer decides
// whether this runs under the RLS-respecting session client or (rarely)
// the service-role client. This file has no opinion on that.
type Client = SupabaseClient<Database>;

// -- Constants ----------------------
const TABLE = "projects" as const;

const SELECT_COMMON = `
id, slug,
  status, is_featured, year,
  created_at, updated_at,
  project_images(
  id,url,"order",is_cover,alt_text)` as const;

const SELECT_FIELDS_WITH_EN = `title_en, description_en, main_contractor_en, 
general_contractor_en, specification_en, location_en, construction_unit_en`;

const SELECT_FIELDS_WITH_VN = `title, description, main_contractor, 
general_contractor, specification, location, construction_unit`;

export async function findAll(
  client: Client,
  opts?: {
    locale?: "vi" | "en";
    limit?: number;
    offset?: number;
  },
): Promise<ProjectRow[]> {
  const fields =
    opts?.locale === "en"
      ? `${SELECT_COMMON}, ${SELECT_FIELDS_WITH_EN}`
      : `${SELECT_COMMON}, ${SELECT_FIELDS_WITH_VN}`;
  let query = client
    .from(TABLE)
    .select(fields)
    .order("created_at", { ascending: false });
  if (opts?.limit) {
    query = query.limit(opts.limit);
  }
  if (opts?.offset) {
    query = query.range(opts.offset, opts.offset + (opts.limit ?? 10) - 1);
  }
  const { data, error } = await query;
  if (error) {
    console.error("Database error:", error);
    throw new Error("Database operation failed");
  }
  return data ?? [];
}
