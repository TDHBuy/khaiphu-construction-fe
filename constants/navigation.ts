import { routes } from "./routes";
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
      { key: "companyProfile", href: routes.about.companyProfile },
      { key: "visionMission", href: routes.about.visionMission },
      { key: "partners", href: routes.about.partners },
      { key: "qualityStandards", href: routes.about.qualityStandards },
      { key: "implementationCapacity", href: routes.about.implementationCapacity },
    ],
  },
  {
    key: "services",
    children: [
      { key: "shoringConstruction", href: routes.services.shoringConstruction },
      { key: "larsenPile", href: routes.services.larsenPile },
      { key: "kingpostFabrication", href: routes.services.kingpostFabrication },
      { key: "extendedService", href: routes.services.extendedService },
    ],
  },  { key: "projects", href: routes.projects },
  { key: "equipment", href: routes.equipment },
  { key: "contact", href: routes.contact },
];
