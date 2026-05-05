export interface MockProject {
    id: string;
    slug: string;
    title: string;
    titleEn: string;
    location: string;
    year: number;
    serviceType: "shoring" | "larsen" | "kingpost";
    coverImage: string;
    client?: string;
  }
  
  export const MOCK_PROJECTS: MockProject[] = [
    {
      id: "1",
      slug: "shoring-toa-nha-van-phong-quan-1",
      title: "Shoring Tòa nhà Văn phòng Quận 1",
      titleEn: "Shoring for Office Building District 1",
      location: "Quận 1, TP.HCM",
      year: 2024,
      serviceType: "shoring",
      coverImage:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
      client: "Vingroup",
    },
    {
      id: "2",
      slug: "ep-cu-larsen-du-an-metro",
      title: "Ép cừ Larsen Dự án Metro",
      titleEn: "Larsen Pile Driving for Metro Project",
      location: "Quận 2, TP.HCM",
      year: 2024,
      serviceType: "larsen",
      coverImage:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      client: "MAUR",
    },
    {
      id: "3",
      slug: "kingpost-trung-tam-thuong-mai",
      title: "Kingpost Trung tâm Thương mại Landmark",
      titleEn: "Kingpost for Landmark Shopping Center",
      location: "Quận 7, TP.HCM",
      year: 2023,
      serviceType: "kingpost",
      coverImage:
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200&q=80",
      client: "Phú Mỹ Hưng",
    },
    {
      id: "4",
      slug: "shoring-ham-B3-chung-cu-cao-cap",
      title: "Shoring Hầm B3 Chung cư Cao cấp",
      titleEn: "B3 Basement Shoring - Premium Apartment",
      location: "Bình Thạnh, TP.HCM",
      year: 2023,
      serviceType: "shoring",
      coverImage:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      client: "Novaland",
    },
    {
      id: "5",
      slug: "larsen-cang-bien-cai-mep",
      title: "Cừ Larsen Cảng Cái Mép",
      titleEn: "Cai Mep Port Larsen Piles",
      location: "Bà Rịa - Vũng Tàu",
      year: 2022,
      serviceType: "larsen",
      coverImage:
        "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1200&q=80",
      client: "Gemalink",
    },
    {
      id: "6",
      slug: "kingpost-nha-may-sai-gon",
      title: "Kingpost Nhà máy Sài Gòn",
      titleEn: "Saigon Factory Kingpost",
      location: "Long An",
      year: 2022,
      serviceType: "kingpost",
      coverImage:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      client: "Samsung",
    },
  ];
  
  export const MOCK_STATS = [
    { key: "projects", value: 150, suffix: "+" },
    { key: "years", value: 10, suffix: "+" },
    { key: "equipment", value: 25, suffix: "+" },
    { key: "satisfaction", value: 98, suffix: "%" },
  ];
  
  export const MOCK_PROCESS_STEPS = [
    { key: "step_1", number: "01" },
    { key: "step_2", number: "02" },
    { key: "step_3", number: "03" },
    { key: "step_4", number: "04" },
  ];
  