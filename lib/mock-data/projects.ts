import type { Database } from "../types/database.types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectImageRow = Database["public"]["Tables"]["project_images"]["Row"];

export const mockProjects: ProjectRow[] = [
  {
    id: "proj-01",
    slug: "ha-tang-khung-thep-san-long-an",
    title_vi: "Hạ Tầng Khung Thép Sàn Long An",
    title_en: "Steel Frame Floor Infrastructure Long An",
    description_vi:
      "Lắp dựng và tháo dỡ hệ giàn chống (Shoring) cho công trình hạ tầng khung thép sàn tại Long An với khối lượng khoảng 800 tấn.",
    description_en:
      "Installation and dismantling of shoring systems for the steel frame floor infrastructure project in Long An with approximately 800 tons of shoring.",
    location: "Long An",
    location_en: "Long An Province",
    general_contractor: "Công Ty Cổ Phần Đầu Tư Xây Dựng Newtecons",
    general_contractor_en: "Newtecons Construction Investment Joint Stock Company",
    main_contractor:
      "Công ty TNHH MTV Thép Phú Thống / Công ty TNHH XD TM Bảo Bình Phát",
    main_contractor_en:
      "Phu Thong Steel Co., Ltd. / Bao Binh Phat Construction Trading Co., Ltd.",
    construction_unit: "Công ty TNHH XD TM Khải Phú",
    construction_unit_en: "Khai Phu Construction Trading Co., Ltd.",
    service_type: ["shoringConstruction"],
    specifications: {
      shoring: "~800 tấn",
    },
    specifications_en: {
      shoring: "~800 tons",
    },
    status: "completed",
    year: 2023,
    is_featured: true,
    created_at: "2023-06-01T00:00:00.000Z",
    updated_at: "2023-12-31T00:00:00.000Z",
  },
  {
    id: "proj-02",
    slug: "narra-residences-mu8-empire-city-thu-thiem",
    title_vi: "Narra Residences (MU8) Khu Empire City (Thủ Thiêm)",
    title_en: "Narra Residences (MU8) Empire City District (Thu Thiem)",
    description_vi:
      "Lắp dựng và tháo dỡ hệ giàn chống (Shoring) và nhổ kingpost thủ công cho dự án Narra Residences tại khu Empire City, Thủ Thiêm.",
    description_en:
      "Installation and dismantling of shoring systems and manual kingpost extraction for Narra Residences project at Empire City, Thu Thiem.",
    location: "Thủ Thiêm, TP. Hồ Chí Minh",
    location_en: "Thu Thiem, Ho Chi Minh City",
    general_contractor: "Công Ty Cổ Phần Đầu Tư Xây Dựng RICONS",
    general_contractor_en: "Ricons Construction Investment Joint Stock Company",
    main_contractor:
      "Công ty TNHH MTV Thép Phú Thống / Công ty TNHH XD TM Bảo Bình Phát",
    main_contractor_en:
      "Phu Thong Steel Co., Ltd. / Bao Binh Phat Construction Trading Co., Ltd.",
    construction_unit: "Công ty TNHH XD TM Khải Phú",
    construction_unit_en: "Khai Phu Construction Trading Co., Ltd.",
    service_type: ["shoringConstruction", "kingpostFabrication"],
    specifications: {
      shoring: "~700 tấn",
      kingpost: "Kingpost H350 18m: 55 cây",
    },
    specifications_en: {
      shoring: "~700 tons",
      kingpost: "Kingpost H350 18m: 55 units",
    },
    status: "completed",
    year: 2023,
    is_featured: true,
    created_at: "2023-03-01T00:00:00.000Z",
    updated_at: "2023-11-30T00:00:00.000Z",
  },
];

export const mockProjectImages: ProjectImageRow[] = [
  {
    id: "img-proj-01-cover",
    project_id: "proj-01",
    url: "/images/projects/ha-tang-long-an/cover.jpg",
    alt_text: "Hạ Tầng Khung Thép Sàn Long An - Hệ giàn chống",
    is_cover: true,
    order: 1,
    created_at: "2023-06-01T00:00:00.000Z",
  },
  {
    id: "img-proj-01-01",
    project_id: "proj-01",
    url: "/images/projects/ha-tang-long-an/01.jpg",
    alt_text: "Lắp dựng hệ giàn chống tại Long An",
    is_cover: false,
    order: 2,
    created_at: "2023-06-01T00:00:00.000Z",
  },
  {
    id: "img-proj-02-cover",
    project_id: "proj-02",
    url: "/images/projects/narra-residences-empire-city/cover.jpg",
    alt_text: "Narra Residences Empire City - Hệ giàn chống Shoring",
    is_cover: true,
    order: 1,
    created_at: "2023-03-01T00:00:00.000Z",
  },
  {
    id: "img-proj-02-01",
    project_id: "proj-02",
    url: "/images/projects/narra-residences-empire-city/01.jpg",
    alt_text: "Lắp dựng hệ giàn chống tại Narra Residences",
    is_cover: false,
    order: 2,
    created_at: "2023-03-01T00:00:00.000Z",
  },
  {
    id: "img-proj-02-02",
    project_id: "proj-02",
    url: "/images/projects/narra-residences-empire-city/02.jpg",
    alt_text: "Nhổ kingpost H350 tại Narra Residences",
    is_cover: false,
    order: 3,
    created_at: "2023-03-01T00:00:00.000Z",
  },
];
