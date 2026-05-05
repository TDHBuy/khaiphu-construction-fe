"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FEATURED_PROJECTS } from "@/lib/constants";

// Reusable info row component
interface InfoRowProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

function InfoRow({ label, children, className = "" }: InfoRowProps) {
  return (
    <div className={`border-b border-neutral-200 py-5 lg:py-6 ${className}`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </p>
      <div className="mt-2 text-base font-medium leading-snug text-primary-900 lg:text-lg">
        {children}
      </div>
    </div>
  );
}

export function CompanyInfo() {
  const t = useTranslations("about.companyProfile.info");

  return (
    <section className="bg-neutral-50 py-24 lg:py-32">
      <div className="container-custom">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl lg:mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-600">
            — {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-primary-900 sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <div className="divider-blueprint mt-8" />
        </motion.div>

        {/* ─── Two-Column Layout ─── */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ═══════════════════════════════════════════════
              LEFT COLUMN — Company Info List
              ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Top accent bar */}
            <div className="mb-2 h-1 w-12 bg-accent-500" />

            <div className="border-t border-neutral-200">
              {/* Row 1: Tên công ty */}
              <InfoRow label={t("companyLabel")}>
                <p className="font-display font-bold leading-snug">
                  {t("companyValue")}
                </p>
              </InfoRow>

              {/* Row 2: Địa chỉ */}
              <InfoRow label={t("addressLabel")}>
                {t("addressValue")}
              </InfoRow>

              {/* Row 3: Lĩnh vực hoạt động (numbered list) */}
              <InfoRow label={t("scopeLabel")}>
                <ol className="mt-1 space-y-2">
                  {[1, 2, 3, 4].map((num) => (
                    <li
                      key={num}
                      className="flex items-baseline gap-3 text-base lg:text-lg"
                    >
                      <span className="font-display text-sm font-bold text-accent-600">
                        0{num}.
                      </span>
                      <span className="text-primary-900">
                        {t(`scopeItem${num}`)}
                      </span>
                    </li>
                  ))}
                </ol>
              </InfoRow>

              {/* Row 4: Vốn điều lệ + Năm thành lập (split row) */}
              <div className="grid grid-cols-2 gap-6 border-b border-neutral-200 py-5 lg:py-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                    {t("capitalLabel")}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold text-primary-900 lg:text-xl">
                    {t("capitalValue")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                    {t("foundedLabel")}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold text-primary-900 lg:text-xl">
                    {t("foundedValue")}
                  </p>
                </div>
              </div>

              {/* Row 5: Đại diện pháp luật */}
              <InfoRow label={t("representativeLabel")} className="border-b-0">
                {t("representativeValue")}
              </InfoRow>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════
              RIGHT COLUMN — Featured Projects Table
              ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Header */}
            <div className="mb-2 h-1 w-12 bg-accent-500" />
            <div className="border-t border-neutral-200 pb-4 pt-6 lg:pt-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-600">
                {t("projectsTitle")}
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold leading-tight text-primary-900 lg:text-3xl">
                {t("projectsSubtitle")}
              </p>
            </div>

            {/* Projects table — only bottom borders */}
            <ul className="mt-2">
              {FEATURED_PROJECTS.map((project, index) => (
                <motion.li
                  key={project.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-start justify-between gap-6 border-b border-neutral-200 py-5 transition-colors hover:bg-white lg:py-6"
                >
                  {/* Number + Name */}
                  <div className="flex min-w-0 flex-1 items-baseline gap-4">
                    <span className="font-display text-sm font-bold text-accent-600 lg:text-base">
                      0{index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-base font-bold leading-snug text-primary-900 transition-colors group-hover:text-primary-700 lg:text-lg">
                        {project.name}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500 lg:text-sm">
                        {project.location}
                      </p>
                    </div>
                  </div>

                  {/* Year (right-aligned) */}
                  <div className="shrink-0 pt-0.5">
                    <span className="font-display text-sm font-bold text-neutral-500 lg:text-base">
                      {project.year}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
