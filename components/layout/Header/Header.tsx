"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Image from "next/image";
export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isMobileSearch = isSearchOpen && window.innerWidth < 1024;
    document.body.style.overflow = isMobileOpen || isMobileSearch ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, isSearchOpen]);

  // Auto-focus the correct input when search opens
  useEffect(() => {
    if (!isSearchOpen) return;
    const timer = setTimeout(() => {
      if (window.innerWidth >= 1024) {
        desktopInputRef.current?.focus();
      } else {
        mobileInputRef.current?.focus();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [isSearchOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) setIsSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isSearchOpen]);

  // Focus trap — mobile overlay only
  useEffect(() => {
    if (!isSearchOpen || window.innerWidth >= 1024) return;
    const overlay = mobileOverlayRef.current;
    if (!overlay) return;

    const focusable = overlay.querySelectorAll<HTMLElement>(
      'button, input, a[href], [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trapTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", trapTab);
    return () => document.removeEventListener("keydown", trapTab);
  }, [isSearchOpen]);

  const isTransparent = isHomepage && !isScrolled && !isMobileOpen && !isSearchOpen;

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
        {/* Company Name */}
        <div className="hidden sm:block">
            <div
              className={cn(
                "font-display font-bold text-base leading-tight transition-colors",
                isTransparent ? "text-white" : "text-primary-900"
              )}
            >
              KHẢI PHÚ
            </div>
            <div
              className={cn(
                "text-[10px] tracking-[0.2em] transition-colors",
                isTransparent ? "text-white/80" : "text-neutral-500"
              )}
            >
              CONSTRUCTION
            </div>
          </div>
        </Link>
        {/* Desktop: Nav + inline search (flex-1 bounds search between logo and right actions) */}
        <div className="relative hidden flex-1 items-center justify-center lg:flex">
          {/* Nav — fades out when search opens */}
          <nav
            className={cn(
              "flex items-center gap-8 transition-all duration-300",
              isSearchOpen ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-accent-500",
                  isTransparent ? "text-white" : "text-neutral-800"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Desktop search input — fades in when search opens */}
          <div
            className={cn(
              "absolute inset-x-0 flex items-center transition-all duration-300",
              isSearchOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            )}
          >
            <div className="relative w-full">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
              <input
                ref={desktopInputRef}
                type="search"
                placeholder="Tìm kiếm..."
                className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-10 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Tìm kiếm"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-neutral-400 transition-colors hover:text-neutral-700"
                aria-label="Đóng tìm kiếm"
              >
                <X size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher isTransparent={isTransparent} />

          {/* Search icon — hidden while open */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-neutral-700 hover:bg-neutral-100",
              isSearchOpen && "hidden"
            )}
            aria-label="Mở tìm kiếm"
            aria-expanded={isSearchOpen}
          >
            <Search size={20} />
          </button>

          {/* Contact — hidden on desktop when search is open */}
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
            onClick={() => setIsMobileOpen(!isMobileOpen)}
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

      {/* Mobile search overlay — covers full viewport, lg:hidden keeps it off desktop */}
      <div
        ref={mobileOverlayRef}
        className={cn(
          "lg:hidden fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300",
          isSearchOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Tìm kiếm"
      >
        {/* Blur backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
          aria-hidden="true"
        />

        {/* Centered search bar */}
        <div
          className={cn(
            "relative z-10 w-full px-4 transition-all duration-300",
            isSearchOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              ref={mobileInputRef}
              type="search"
              placeholder="Tìm kiếm..."
              className="h-14 w-full rounded-xl bg-white pl-12 pr-5 text-base text-neutral-900 placeholder:text-neutral-400 shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Tìm kiếm"
            />
          </div>
        </div>

        {/* Close — top-right corner */}
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
          aria-label="Đóng tìm kiếm"
        >
          <X size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="container-custom flex flex-col gap-1 py-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="border-b border-neutral-100 py-4 font-medium text-neutral-900 hover:text-primary-700"
            >
              {t(item.key)}
            </Link>
          ))}
          <Button
            asChild
            className="mt-6 bg-accent-500 text-neutral-900 hover:bg-accent-400"
            onClick={() => setIsMobileOpen(false)}
          >
            <Link href="/lien-he">{t("contact")}</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
