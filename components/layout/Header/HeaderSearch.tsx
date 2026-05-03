"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderSearchProps {
  isOpen: boolean;
  onClose: () => void;
  isTransparent: boolean;
}

export function HeaderSearch({ isOpen, onClose, isTransparent }: HeaderSearchProps) {
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);

  // Auto-focus the right input when opened
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      if (window.innerWidth >= 1024) {
        desktopInputRef.current?.focus();
      } else {
        mobileInputRef.current?.focus();
      }
    }, 50);
    return () => clearTimeout(t);
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Focus trap for mobile overlay — query live on each keypress to avoid stale DOM snapshots
  useEffect(() => {
    if (!isOpen || window.innerWidth >= 1024) return;
    const overlay = mobileOverlayRef.current;
    if (!overlay) return;

    const selector = 'button, input, a[href], [tabindex]:not([tabindex="-1"])';

    const trapTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = overlay.querySelectorAll<HTMLElement>(selector);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener("keydown", trapTab);
    return () => document.removeEventListener("keydown", trapTab);
  }, [isOpen]);

  return (
    <>
      {/* Desktop: inline panel — absolute within the center relative div in Header */}
      <div
        className={cn(
          "absolute inset-x-0 flex items-center transition-all duration-300",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="relative w-full">
          <Search
            size={17}
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            ref={desktopInputRef}
            type="search"
            placeholder="Tìm kiếm..."
            tabIndex={isOpen ? 0 : -1}
            className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-10 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Tìm kiếm"
          />
          <button
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-neutral-400 transition-colors hover:text-neutral-700"
            aria-label="Đóng tìm kiếm"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Mobile: full-screen overlay */}
      <div
        ref={mobileOverlayRef}
        className={cn(
          "lg:hidden fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Tìm kiếm"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Search bar */}
        <div
          className={cn(
            "relative z-10 w-full px-4 transition-all duration-300",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          <div className="relative">
            <Search
              size={20}
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              ref={mobileInputRef}
              type="search"
              placeholder="Tìm kiếm..."
              tabIndex={isOpen ? 0 : -1}
              className="h-14 w-full rounded-xl bg-white pl-12 pr-14 text-base text-neutral-900 placeholder:text-neutral-400 shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Tìm kiếm"
            />
            {/* X button — inside input, right side */}
            <button
              onClick={onClose}
              tabIndex={isOpen ? 0 : -1}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700"
              aria-label="Đóng tìm kiếm"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
