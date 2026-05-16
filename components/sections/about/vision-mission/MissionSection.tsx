"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionLabel from "@/components/shared/SectionLabel";
import IconMap from "./IconMap";
import { fadeUp } from "@/components/shared/animations";

type Pillar = { icon: string; title: string; description: string };

export default function MissionSection() {
  const t = useTranslations("visionMission.mission");
  const pillars = t.raw("pillars") as Pillar[];

  return (
    <AnimatedSection className="bg-[#0A4D9C] py-24 lg:py-32 relative overflow-hidden">
      {/* BG texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #fff 0, #fff 1px,
            transparent 1px, transparent 60%
          )`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* ── Header ── */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
          <SectionLabel label={t("label")} labelEn={t("labelEn")} />
          <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
            {t("heading")}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed">
            {t("body")}
          </p>
        </motion.div>

        {/* ── Pillar cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={0.1 + i * 0.1}
              className="group relative bg-white/5 border border-white/10 rounded-sm p-7 hover:bg-white/10 hover:border-[#FFCB05]/40 transition-all duration-300 cursor-default"
            >
              {/* Number watermark */}
              <span className="absolute top-4 right-5 text-5xl font-black text-white/[0.04] select-none leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="text-[#FFCB05] mb-5 group-hover:scale-110 transition-transform duration-300">
                {IconMap[pillar.icon] ?? null}
              </div>

              <h3 className="text-white font-semibold text-base mb-2 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {pillar.description}
              </p>

              {/* Bottom hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FFCB05] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-b-sm" />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
