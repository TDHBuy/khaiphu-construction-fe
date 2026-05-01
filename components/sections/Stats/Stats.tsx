"use client"
import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MOCK_STATS } from "@/lib/mock-data";
import { AnimatedCounter } from "./AnimatedCounter";
import { StaggerContainer, staggerItemVariants } from "@/components/shared/StaggerContainer";
import { motion } from "framer-motion";
export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="relative overflow-hidden bg-primary-900 py-24 lg:py-32">
      {/* Background pattern */}
      {/* <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      /> */}

      <div className="container-custom relative">
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <p className="section-number mb-4 text-accent-400">
              04 — {t("section_label")}
            </p>
            <h2 className="text-h2 text-balance font-display font-bold text-white">
              {t("section_title")}
            </h2>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {MOCK_STATS.map((stat, index) => (
            <motion.div key={stat.key} variants={staggerItemVariants} className="text-center lg:text-left">
              <div className="text-center lg:text-left">
                <div className="font-display text-5xl font-extrabold text-accent-400 lg:text-7xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="divider-blueprint my-4 opacity-60" />
                <p className="text-sm font-medium uppercase tracking-wider text-white/80 lg:text-base">
                  {t(stat.key)}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
