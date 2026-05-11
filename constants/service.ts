import { routes } from "./routes";
export const SERVICES = [
    {
      key: "shoringConstruction" as const,
      number: "01",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      href: routes.services.shoringConstruction, // ✅ sync với NAV_ITEMS
    },
    {
      key: "larsenPile" as const,
      number: "02",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
      href: routes.services.larsenPile, // ✅
    },
    {
      key: "kingpostFabrication" as const,
      number: "03",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
      href: routes.services.kingpostFabrication, // ✅
    },
  ];