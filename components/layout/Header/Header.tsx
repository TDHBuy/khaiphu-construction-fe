"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { HeaderSearch } from "./HeaderSearch";
import Image from "next/image";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Tracks which parent item is expanded in the mobile drawer
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock — mobile nav OR mobile search overlay
  useEffect(() => {
    const lockForMobileSearch = isSearchOpen && window.innerWidth < 1024;
    document.body.style.overflow = isMobileOpen || lockForMobileSearch ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen, isSearchOpen]);

  const isTransparent = isHomepage && !isScrolled && !isMobileOpen && !isSearchOpen;

  function closeMobileMenu() {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="container-custom flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Khải Phú Construction"
            width={55}
            height={55}
            priority
          />
          <div className="hidden sm:block">
            <div className={cn("font-display font-bold text-base leading-tight transition-colors", isTransparent ? "text-white" : "text-primary-900")}>
              KHẢI PHÚ
            </div>
            <div className={cn("text-[10px] tracking-[0.2em] transition-colors", isTransparent ? "text-white/80" : "text-neutral-500")}>
              CONSTRUCTION
            </div>
          </div>
        </Link>

        {/* Desktop: nav fades out when search opens; HeaderSearch panel fades in */}
        <div className="relative flex flex-1 items-center justify-center h-0 overflow-hidden lg:h-auto lg:overflow-visible">
          <nav
            className={cn(
              "flex items-center gap-8 transition-all duration-300",
              isSearchOpen ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          >
            {NAV_ITEMS.map((item) =>
              item.children ? (
                // Parent with dropdown — not a link, hover-only on desktop
                <div key={item.key} className="group relative">
                  <span
                    className={cn(
                      "flex cursor-default select-none items-center gap-1 text-lg font-medium transition-colors",
                      isTransparent
                        ? "text-white group-hover:text-white/80"
                        : "text-neutral-800 group-hover:text-accent-500"
                    )}
                  >
                    {t(item.key)}
                    <ChevronDown
                      size={15}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </span>

                  {/* Outer div bridges the gap between trigger and panel, keeping group hovered */}
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
              ) : (
                // Regular nav link
                <Link
                  key={item.key}
                  href={item.href!}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-accent-500",
                    isTransparent ? "text-white" : "text-neutral-800"
                  )}
                >
                  {t(item.key)}
                </Link>
              )
            )}
          </nav>

          <HeaderSearch
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            isTransparent={isTransparent}
          />
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher isTransparent={isTransparent} />

          {/* Search trigger — hidden while panel is open */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
              isTransparent ? "text-white hover:bg-white/10" : "text-neutral-700 hover:bg-neutral-100",
              isSearchOpen && "hidden"
            )}
            aria-label="Mở tìm kiếm"
            aria-expanded={isSearchOpen}
          >
            <Search size={20} />
          </button>

          {/* Contact — hides on desktop when search is open */}
          <Button
            asChild
            size="sm"
            className={cn(
              "hidden md:inline-flex bg-accent-500 text-neutral-900 hover:bg-accent-400",
              isSearchOpen && "lg:hidden"
            )}
          >
            <Link href="/lien-he">{t("contact")}</Link>
          </Button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => (isMobileOpen ? closeMobileMenu() : setIsMobileOpen(true))}
            className={cn(
              "lg:hidden flex h-10 w-10 items-center justify-center rounded-md transition-colors",
              isTransparent ? "text-white" : "text-neutral-900"
            )}
            aria-label={isMobileOpen ? "Đóng menu" : "Mở menu"}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="container-custom flex flex-col gap-1 py-6">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              // Mobile accordion item
              <div key={item.key}>
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.key ? null : item.key)
                  }
                  className="flex w-full items-center justify-between border-b border-neutral-100 py-4 font-medium text-neutral-900 hover:text-primary-700"
                >
                  {t(item.key)}
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform duration-300",
                      openDropdown === item.key && "rotate-180"
                    )}
                  />
                </button>

                {/* Child items — height animates open/closed */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openDropdown === item.key ? "max-h-96" : "max-h-0"
                  )}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      href={child.href}
                      onClick={closeMobileMenu}
                      className="block border-b border-neutral-50 py-3 pl-4 text-sm text-neutral-600 hover:text-primary-700"
                    >
                      {t(child.key)}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              // Regular mobile link
              <Link
                key={item.key}
                href={item.href!}
                onClick={closeMobileMenu}
                className="border-b border-neutral-100 py-4 font-medium text-neutral-900 hover:text-primary-700"
              >
                {t(item.key)}
              </Link>
            )
          )}

          <Button
            asChild
            className="mt-6 bg-accent-500 text-neutral-900 hover:bg-accent-400"
            onClick={closeMobileMenu}
          >
            <Link href="/lien-he">{t("contact")}</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
