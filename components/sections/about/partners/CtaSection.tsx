"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export default function CtaSection() {
  const t = useTranslations("partners.cta");

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-[96px]"
      style={{ background: "linear-gradient(135deg, #0a4d9c 0%, #0d3a7a 100%)" }}
    >
      {/* Decorative shape top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,203,5,0.06)",
        }}
      />

      {/* Decorative shape bottom-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
        }}
      />

      {/* Diagonal pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(-45deg, rgba(255,255,255,0.015) 0, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 32px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <RevealOnScroll>
          <div className="flex flex-col items-center gap-5">
            {/* Pulsing label */}
            <div className="inline-flex items-center gap-2.5">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#ffcb05] flex-shrink-0"
                animate={{ opacity: [1, 0.6, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[rgba(255,203,5,0.9)]">
                {t("label")}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-extrabold text-white m-0"
              style={{
                fontSize: "clamp(28px, 4.5vw, 48px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              {t("title")}
            </h2>

            {/* Description */}
            <p
              className="text-white/75 mx-auto"
              style={{
                fontSize: "clamp(14px, 1.5vw, 16px)",
                lineHeight: 1.85,
                maxWidth: 600,
              }}
            >
              {t("description")}
            </p>

            {/* CTA Button */}
            <Link
              href="/lien-he"
              className="group relative inline-flex items-center gap-2.5 px-10 py-4 bg-[#ffcb05] text-[#0a1f3d] text-[15px] font-bold rounded-[4px] overflow-hidden no-underline hover:bg-[#f5b400] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,203,5,0.3)] transition-all duration-300"
            >
              {/* Shimmer overlay */}
              <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

              <span className="relative z-10">{t("button")}</span>

              {/* Arrow icon */}
              <svg
                className="relative z-10 w-[18px] h-[18px] group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
