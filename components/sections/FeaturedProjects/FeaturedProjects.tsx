import { getLocale } from "next-intl/server";
import { ProjectsService } from "@/lib/services/projects.services";
import {
  FeaturedProjectsClient,
  type ProjectCardData,
} from "./FeaturedProjectsClient";

export async function FeaturedProjects() {
  const locale = await getLocale();

  let projects: ProjectCardData[] = [];
  try {
    const raw = await ProjectsService.getHomeProjects();
    projects = raw.map((p) => {
      const images = p.project_images as Array<{
        id: string;
        url: string;
        order: number;
        is_cover: boolean;
        alt_text: string | null;
      }>;
      const coverImage =
        images.find((img) => img.is_cover)?.url ?? images[0]?.url ?? "";

      return {
        id: String(p.id),
        slug: p.slug,
        title: locale === "vi" ? p.title_vi : (p.title_en ?? p.title_vi),
        location: locale === "vi" ? p.location : (p.location_en ?? p.location),
        year: p.year ?? 0,
        serviceType: p.service_type.join("/") ?? "Unknown",
        image: coverImage,
      };
    });
  } catch {
    projects = [];
  }

  console.log("Featured projects:", projects);
  return <FeaturedProjectsClient projects={projects} />;
}
