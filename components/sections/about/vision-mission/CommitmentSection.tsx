"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionLabel from "@/components/shared/SectionLabel";
import IconMap from "./IconMap";
import { fadeUp } from "@/components/shared/animations";

type Badge = { icon: string; text: string };

export default function CommitmentSection() {
  const t = useTranslations("visionMission.commitment");
  const badges = t.raw("badges") as Badge[];

  return (
    <AnimatedSection className="bg-white py-20 lg:py-28 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* ── Header ── */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
          <SectionLabel label={t("label")} labelEn={t("labelEn")} />
          <h2 className="text-3xl font-bold text-[#0A4D9C]">{t("heading")}</h2>
        </motion.div>

        {/* ── Badges grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={0.1 + i * 0.08}
              className="group flex flex-col items-center text-center gap-4 p-8 border-2 border-[#0A4D9C]/12 rounded-sm hover:border-[#0A4D9C] hover:bg-[#0A4D9C]/[0.02] transition-all duration-300 cursor-default"
            >
              <div className="w-14 h-14 rounded-sm bg-[#0A4D9C]/[0.06] flex items-center justify-center text-[#0A4D9C] group-hover:bg-[#0A4D9C] group-hover:text-white transition-all duration-300">
                {IconMap[badge.icon] ?? null}
              </div>
              <p className="text-[#0A4D9C] font-semibold text-sm leading-snug">
                {badge.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
