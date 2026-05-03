"use client";

import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { HeaderSearch } from "./HeaderSearch";
import { MobileDrawer } from "./MobileDrawer";
import { DesktopNavItem } from "./NavItem";
import Image from "next/image";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const lockForMobileSearch = isSearchOpen && window.innerWidth < 1024;
    document.body.style.overflow = isMobileOpen || lockForMobileSearch ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen, isSearchOpen]);

  const isTransparent = isHomepage && !isScrolled && !isMobileOpen && !isSearchOpen;
  const closeMobileMenu = () => { setIsMobileOpen(false); setOpenDropdown(null); };
  const toggleDropdown = (key: string) => setOpenDropdown((p) => (p === key ? null : key));

  return (
    <header className={cn("fixed top-0 z-50 w-full transition-all duration-300", isTransparent ? "bg-transparent" : "bg-white/95 backdrop-blur-md shadow-sm")}>
      <div className="container-custom flex h-16 items-center justify-between gap-4 md:h-20">

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.svg" alt="Khải Phú Construction" width={55} height={55} priority />
          <div className="hidden sm:block">
            <p className={cn("font-display font-bold text-base leading-tight transition-colors", isTransparent ? "text-white" : "text-primary-900")}>KHẢI PHÚ</p>
            <p className={cn("text-[10px] tracking-[0.2em] transition-colors", isTransparent ? "text-white/80" : "text-neutral-500")}>CONSTRUCTION</p>
          </div>
        </Link>

        <div className="relative flex flex-1 items-center justify-center h-0 overflow-hidden lg:h-auto lg:overflow-visible">
          <nav className={cn("flex items-center gap-8 transition-all duration-300", isSearchOpen ? "pointer-events-none opacity-0" : "opacity-100")}>
            {NAV_ITEMS.map((item) => <DesktopNavItem key={item.key} item={item} isTransparent={isTransparent} />)}
          </nav>
          <HeaderSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} isTransparent={isTransparent} />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher isTransparent={isTransparent} />
          <button onClick={() => setIsSearchOpen(true)} aria-label="Mở tìm kiếm" aria-expanded={isSearchOpen}
            className={cn("flex h-10 w-10 items-center justify-center rounded-md transition-colors", isTransparent ? "text-white hover:bg-white/10" : "text-neutral-700 hover:bg-neutral-100", isSearchOpen && "hidden")}>
            <Search size={20} />
          </button>
          <Button asChild size="sm" className={cn("hidden md:inline-flex bg-accent-500 text-neutral-900 hover:bg-accent-400", isSearchOpen && "lg:hidden")}>
            <Link href="/lien-he">{t("contact")}</Link>
          </Button>
          <button onClick={() => (isMobileOpen ? closeMobileMenu() : setIsMobileOpen(true))} aria-label={isMobileOpen ? "Đóng menu" : "Mở menu"}
            className={cn("lg:hidden flex h-10 w-10 items-center justify-center rounded-md transition-colors", isTransparent ? "text-white" : "text-neutral-900")}>
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>
      <MobileDrawer isOpen={isMobileOpen} openDropdown={openDropdown} onClose={closeMobileMenu} onToggleDropdown={toggleDropdown} />
    </header>
  );
}
