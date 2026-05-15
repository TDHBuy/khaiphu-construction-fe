"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { fadeUp, fadeIn } from "@/components/shared/animations";

export default function HeroSection() {
  const t = useTranslations("visionMission.hero");
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A4D9C]">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #fff 0, #fff 1px,
            transparent 1px, transparent 50%
          )`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#083d7a] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* ── Text block ── */}
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="flex items-center gap-3 mb-6"
          >
            <span className="block w-8 h-[2px] bg-[#FFCB05]" />
            <span className="text-[#FFCB05] text-xs font-semibold tracking-[0.25em] uppercase">
              {t("label")}
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6"
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#vision"
              className="inline-flex items-center gap-2 bg-[#FFCB05] text-[#0A4D9C] font-semibold px-7 py-3 rounded-sm text-sm hover:bg-yellow-300 transition-colors"
            >
              {t("ctaPrimary")}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-7 py-3 rounded-sm text-sm hover:bg-white/10 transition-colors"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>

        {/* ── Graphic ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeIn}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-72 h-72">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-6 rounded-full border border-[#FFCB05]/20" />
            <div className="absolute inset-12 rounded-full border border-[#FFCB05]/40" />

            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFCB05"
                strokeWidth={1}
                className="w-24 h-24 opacity-60"
              >
                <path d="M3 21h18M9 21V10a3 3 0 0 1 6 0v11M3 7l9-4 9 4" />
                <rect x="1" y="20" width="22" height="1" />
                <path d="M7 14h2m-2 3h2m6-3h2m-2 3h2" />
              </svg>
            </div>

            <div className="absolute -top-2 -right-2 bg-[#FFCB05] text-[#0A4D9C] text-[10px] font-bold px-3 py-1.5 rounded-sm">
              EST. 2010
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={2}
            className="w-5 h-5"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
