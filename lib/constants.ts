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

export type NavItem = {
  key: string;
  href?: string;
  children?: NavDropdownItem[];
};

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
      { key: "expansion", href: "/services/expansion" },
    ],
  },
  { key: "projects", href: "/projects" },
  { key: "equipment", href: "/equipment" },
  { key: "contact", href: "/contact" },
];
  
  export const SERVICES = [
    { key: "shoring", slug: "shoring" },
    { key: "larsen", slug: "cu-larsen" },
    { key: "kingpost", slug: "kingpost" },
  ] as const;

  export const SERVICES_DATA = [
    {
      key: "shoring" as const,
      number: "01",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      href: "/dich-vu/shoring",
    },
    {
      key: "larsen" as const,
      number: "02",
      image:
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
      href: "/dich-vu/cu-larsen",
    },
    {
      key: "kingpost" as const,
      number: "03",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
      href: "/dich-vu/kingpost",
    },
  ];