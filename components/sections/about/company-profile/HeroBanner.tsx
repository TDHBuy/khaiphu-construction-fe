"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fadeUp } from "@/components/shared/animations";
export function HeroBanner() {
  const t = useTranslations("companyProfile");
  const tNav = useTranslations("navigation");

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-primary-900">
      {/* Background image with subtle Ken Burns */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80"
          alt="Khải Phú construction site"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Gradient overlay - 40% black as requested */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 via-primary-900/40 to-primary-900/80" />

      {/* Yellow accent bar */}
      <div className="absolute bottom-0 left-0 h-1 w-32 bg-accent-500 lg:w-48" />

      <div className="container-custom relative z-10 pb-20 pt-32 lg:pb-28">
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
            {tNav("companyProfile").toUpperCase()}
          </span>
        </motion.nav>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-[120px]"
        >
          {t("hero.title")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg font-light text-white/90 sm:text-xl lg:text-2xl"
        >
          {t("hero.subtitle")}
        </motion.p>
      </div>
    </section>
  );
}
