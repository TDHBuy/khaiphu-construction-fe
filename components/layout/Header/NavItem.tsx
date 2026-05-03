"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NavItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

// ─── Desktop ─────────────────────────────────────────────────────────────────

interface DesktopNavItemProps {
  item: NavItem;
  isTransparent: boolean;
}

export function DesktopNavItem({ item, isTransparent }: DesktopNavItemProps) {
  const t = useTranslations("nav");

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "text-lg font-medium transition-colors hover:text-accent-500",
          isTransparent ? "text-white" : "text-neutral-800"
        )}
      >
        {t(item.key)}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <span
        className={cn(
          "flex cursor-default select-none items-center gap-1 text-lg font-medium transition-colors",
          isTransparent
            ? "text-white group-hover:text-white/80"
            : "text-neutral-800 group-hover:text-accent-500"
        )}
      >
        {t(item.key)}
        <ChevronDown size={15} className="transition-transform duration-300 group-hover:rotate-180" />
      </span>

      {/* pt-2 bridges the gap between trigger and panel, keeping the group hovered */}
      <div className="absolute left-0 top-full z-10 min-w-[220px] pt-2">
        <div
          className={cn(
            "rounded-lg bg-white py-1 shadow-lg",
            "pointer-events-none translate-y-1 opacity-0 transition-all duration-200",
            "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
          )}
        >
          {item.children.map((child) => (
            <Link
              key={child.key}
              href={child.href}
              className="block px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-accent-500 first:rounded-t-lg last:rounded-b-lg"
            >
              {t(child.key)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

interface MobileNavItemProps {
  item: NavItem;
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export function MobileNavItem({ item, isOpen, onClose, onToggle }: MobileNavItemProps) {
  const t = useTranslations("nav");

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="border-b border-neutral-100 py-4 font-medium text-neutral-900 hover:text-primary-700"
      >
        {t(item.key)}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between border-b border-neutral-100 py-4 font-medium text-neutral-900 hover:text-primary-700"
      >
        {t(item.key)}
        <ChevronDown
          size={16}
          className={cn("transition-transform duration-300", isOpen && "rotate-180")}
        />
      </button>

      {/* max-h-[500px] safely exceeds any realistic nav menu height while still animating */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 ease-in-out",
          isOpen ? "max-h-[500px]" : "max-h-0"
        )}
      >
        {item.children.map((child) => (
          <Link
            key={child.key}
            href={child.href}
            onClick={onClose}
            className="block border-b border-neutral-50 py-3 pl-4 text-sm text-neutral-600 hover:text-primary-700"
          >
            {t(child.key)}
          </Link>
        ))}
      </div>
    </div>
  );
}
