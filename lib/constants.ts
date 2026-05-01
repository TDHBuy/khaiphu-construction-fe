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
  
  export const NAV_ITEMS = [
    { key: "about", href: "/about-us" },
    { key: "services", href: "/service" },
    { key: "projects", href: "/projects" },
    { key: "equipment", href: "/equipment" },
    { key: "contact", href: "/contact" },
  ] as const;
  
  export const SERVICES = [
    { key: "shoring", slug: "shoring" },
    { key: "larsen", slug: "cu-larsen" },
    { key: "kingpost", slug: "kingpost" },
  ] as const;
  