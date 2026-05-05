export const SITE_CONFIG = {
    name: "Khải Phú Construction",
    nameEn: "Khai Phu Construction",
    tagline: "Nền móng vững chắc cho mọi công trình",
    email: "contact@khaiphu.vn",
    phone: "+84 901 234 567",
    address: "TP. Hồ Chí Minh, Việt Nam",
    social: {
      facebook: "https://facebook.com/khaiphuconstruction",
      zalo: "https://zalo.me/khaiphuconstruction",
    },
  } as const;
  
  export type NavDropdownItem = {
  key: string;
  href: string;
};

// Discriminated union: every item has either href (leaf) or children (parent), never both, never neither.
export type NavItem =
  | { key: string; href: string; children?: never }
  | { key: string; href?: never; children: NavDropdownItem[] };

export const NAV_ITEMS: NavItem[] = [
  {
    key: "about",
    children: [
      { key: "companyProfile", href: "/about/company-profile" },
      { key: "visionMission", href: "/about/vision-mission" },
      { key: "partners", href: "/about/partners" },
      { key: "qualityStandards", href: "/about/quality-standards" },
      { key: "implementationCapacity", href: "/about/implementation-capacity" },
    ],
  },
  {
    key: "services",
    children: [
      { key: "shoringConstruction", href: "/services/shoring-construction" },
      { key: "larsenPile", href: "/services/larsen-pile" },
      { key: "kingpostFabrication", href: "/services/kingpost-fabrication" },
      { key: "extendedService", href: "/services/extended-service" },
    ],
  },
  { key: "projects", href: "/projects" },
  { key: "equipment", href: "/equipment" },
  { key: "contact", href: "/contact" },
];
  
  export const SERVICES = [
    { key: "shoring", slug: "shoring-construction" },
    { key: "larsen", slug: "larsen-pile" },
    { key: "kingpost", slug: "kingpost-fabrication" },
  ] as const;

  export const SERVICES_DATA = [
    {
      key: "shoring" as const,
      number: "01",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      href: "/services/shoring-construction", // ✅ sync với NAV_ITEMS
    },
    {
      key: "larsen" as const,
      number: "02",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
      href: "/services/larsen-pile", // ✅
    },
    {
      key: "kingpost" as const,
      number: "03",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
      href: "/services/kingpost-fabrication", // ✅
    },
  ];
  
// Append cuối file constants.ts
export const FEATURED_PROJECTS = [
  {
    name: "Khu dân cư Phú Long – Phân khu số 15B",
    location: "TP.HCM",
    year: "2024",
  },
  {
    name: "Hạ tầng khung – Thái Sơn Long An",
    location: "Long An",
    year: "2024",
  },
  {
    name: "Narra Residences (MU8) – KĐT Empire City",
    location: "Thủ Thiêm, TP.HCM",
    year: "2023",
  },
  {
    name: "Khu đô thị Sài Gòn Bình An – Lô CT8-9",
    location: "TP.HCM",
    year: "2023",
  },
  {
    name: "Khu đô thị Sài Gòn Bình An – Lô CT7",
    location: "TP.HCM",
    year: "2022",
  },
] as const;
