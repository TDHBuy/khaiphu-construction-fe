"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { MobileNavItem } from "./NavItem";

interface MobileDrawerProps {
  isOpen: boolean;
  openDropdown: string | null;
  onClose: () => void;
  onToggleDropdown: (key: string) => void;
}

export function MobileDrawer({ isOpen, openDropdown, onClose, onToggleDropdown }: MobileDrawerProps) {
  const t = useTranslations("navigation");

  return (
    <div className={cn("lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white transition-transform duration-300", isOpen ? "translate-x-0" : "translate-x-full")}>
      <nav className="container-custom flex flex-col gap-1 py-6">
        {NAV_ITEMS.map((item) => (
          <MobileNavItem
            key={item.key}
            item={item}
            isOpen={openDropdown === item.key}
            onClose={onClose}
            onToggle={() => onToggleDropdown(item.key)}
          />
        ))}
        <Button asChild className="mt-6 bg-accent-500 text-neutral-900 hover:bg-accent-400" onClick={onClose}>
          <Link href="/lien-he">{t("contact")}</Link>
        </Button>
      </nav>
    </div>
  );
}
