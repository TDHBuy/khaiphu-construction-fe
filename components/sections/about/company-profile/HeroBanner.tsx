"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function HeroBanner() {
  const t = useTranslations("about.companyProfile");
  const tNav = useTranslations("nav");

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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 text-sm text-white/80"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="transition-colors hover:text-accent-400"
          >
            {tNav("home")}
          </Link>
          <ChevronRight size={14} className="text-white/40" />
          <span className="text-white/80">{tNav("about")}</span>
          <ChevronRight size={14} className="text-white/40" />
          <span className="text-white">{t("breadcrumb")}</span>
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-8 w-px bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
