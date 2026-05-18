"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fadeUp } from "@/components/shared/animations";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("coreCompetencies.hero");
  const tPos = useTranslations("coreCompetencies.positioning");
  const tNav = useTranslations("navigation");

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[#051f44]">
      {/* Background image — Ken Burns zoom */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="https://picsum.photos/seed/shoring-hero/1600/900"
          alt="Khải Phú — thi công shoring và cừ"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlay: navy-deeper bottom → transparent top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #051f44 0%, rgba(5,31,68,0.80) 30%, transparent 100%)",
        }}
      />

      {/* Yellow accent strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ffcb05] z-10" />

      {/* Content — bottom-left */}
      <div
        className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col gap-3 pb-[6vh]"
      >
        {/* Breadcrumb */}
        <motion.nav
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="flex items-center gap-2"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="text-white/60 hover:text-[#ffcb05] transition-colors no-underline text-[11px] font-semibold tracking-[0.22em] uppercase font-sans"
          >
            {tNav("home").toUpperCase()}
          </Link>
          <ChevronRight size={12} className="text-white/40" />
          <span className="text-[#ffcb05] text-[11px] font-semibold tracking-[0.22em] uppercase font-sans">
            {tNav("coreCompetencies").toUpperCase()}
          </span>
        </motion.nav>

        {/* H1 */}
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.15}
          variants={fadeUp}
          className="text-white font-extrabold font-display uppercase m-0 leading-[.96]"
          style={{
            fontSize: "clamp(42px, 7vw, 88px)",
            whiteSpace: "pre-line",
          }}
        >
          {t("title")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.3}
          variants={fadeUp}
          className="m-0 text-white/70 font-sans"
          style={{ fontSize: "18px", maxWidth: "600px", lineHeight: 1.65 }}
        >
          {tPos("body")}
        </motion.p>
      </div>
    </section>
  );
}
