"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fadeUp } from "@/components/shared/animations";
import { ChevronRight } from "lucide-react";
export default function HeroSection() {
  const t = useTranslations("partners.hero");
  const tNav = useTranslations("navigation");

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[#0a2e5c]">
      {/* Background image — Ken Burns zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80"
          alt="Khải Phú partnership — handshake"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlay — navy bottom-up */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,77,156,0.96) 0%, rgba(10,77,156,0.7) 40%, transparent 100%)",
        }}
      />

      {/* Yellow accent strip at bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ffcb05] z-10" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-14 flex flex-col gap-3.5">
        {/* Breadcrumb */}
        <motion.nav
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="flex items-center gap-2.5 text-[13px] text-white/60"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="text-white/60 hover:text-[#ffcb05] transition-colors duration-200 no-underline"
          >
            {tNav("home")}
          </Link>
          <ChevronRight size={14} className="text-white/40" />
          <span className="text-[#ffcb05]">{tNav("partners")}</span>
        </motion.nav>
        {/* Title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeUp}
          className="text-white font-extrabold leading-[1.1] tracking-tight m-0"
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            whiteSpace: "pre-line",
          }}
        >
          {t("title")}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.3}
          variants={fadeUp}
          className="m-0 text-white/80"
          style={{
            maxWidth: 640,
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: 1.75,
          }}
        >
          {t("description")}
        </motion.p>
      </div>
    </section>
  );
}
