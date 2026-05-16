"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionLabel from "@/components/shared/SectionLabel";
import IconMap from "./IconMap";
import { fadeUp, slideLeft, slideRight } from "@/components/shared/animations";

type VisionPoint = { icon: string; text: string };

export default function VisionSection() {
  const t = useTranslations("visionMission.vision");
  const points = t.raw("points") as VisionPoint[];

  return (
    <AnimatedSection id="vision" className="bg-white py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: illustration ── */}
          <motion.div variants={slideLeft} custom={0} className="relative">
            <div className="aspect-square max-w-sm mx-auto lg:mx-0 rounded-sm overflow-hidden bg-[#0A4D9C]/5 border border-[#0A4D9C]/10 flex items-center justify-center relative">
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `
                    linear-gradient(#0A4D9C 1px, transparent 1px),
                    linear-gradient(90deg, #0A4D9C 1px, transparent 1px)
                  `,
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative z-10 text-center p-10">
                <svg
                  viewBox="0 0 120 120"
                  className="w-40 h-40 mx-auto mb-4 opacity-80"
                  fill="none"
                >
                  {/* Foundation layers */}
                  <rect
                    x="10"
                    y="90"
                    width="100"
                    height="12"
                    fill="#0A4D9C"
                    rx="2"
                  />
                  <rect
                    x="20"
                    y="78"
                    width="80"
                    height="12"
                    fill="#0A4D9C"
                    opacity="0.7"
                    rx="2"
                  />
                  <rect
                    x="30"
                    y="66"
                    width="60"
                    height="12"
                    fill="#0A4D9C"
                    opacity="0.5"
                    rx="2"
                  />
                  {/* Building */}
                  <rect
                    x="40"
                    y="30"
                    width="40"
                    height="36"
                    fill="#0A4D9C"
                    opacity="0.2"
                    rx="1"
                  />
                  <rect
                    x="50"
                    y="20"
                    width="20"
                    height="46"
                    fill="#0A4D9C"
                    opacity="0.3"
                    rx="1"
                  />
                  {/* Arrow up */}
                  <path d="M60 8 L52 20 h16 Z" fill="#FFCB05" />
                  <rect x="57" y="20" width="6" height="10" fill="#FFCB05" />
                  {/* Stars */}
                  <circle cx="20" cy="20" r="2" fill="#FFCB05" opacity="0.5" />
                  <circle cx="100" cy="15" r="3" fill="#FFCB05" opacity="0.4" />
                  <circle
                    cx="95"
                    cy="40"
                    r="1.5"
                    fill="#FFCB05"
                    opacity="0.6"
                  />
                </svg>
                <p className="text-[#0A4D9C]/50 text-sm font-medium">
                  {t("illustrationCaption")}
                </p>
              </div>
            </div>

            {/* Year badge */}
            <div className="absolute -bottom-4 -right-4 lg:-right-6 bg-[#0A4D9C] text-white px-5 py-3 rounded-sm">
              <p className="text-[10px] text-white/60 uppercase tracking-widest mb-0.5">
                Định hướng
              </p>
              <p className="text-2xl font-bold text-[#FFCB05] leading-none">
                2030
              </p>
            </div>
          </motion.div>

          {/* ── Right: content ── */}
          <motion.div variants={slideRight} custom={0.1}>
            <SectionLabel label={t("label")} labelEn={t("labelEn")} />

            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A4D9C] leading-tight mb-6">
              {t("heading")}
            </h2>

            <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-lg border-l-2 border-[#FFCB05] pl-4">
              {t("body")}
            </p>

            <div className="space-y-5">
              {points.map((point, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={0.15 + i * 0.08}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#0A4D9C]/[0.08] border border-[#0A4D9C]/10 flex items-center justify-center flex-shrink-0 text-[#0A4D9C]">
                    {IconMap[point.icon] ?? <span className="text-lg">·</span>}
                  </div>
                  <p className="text-gray-700 font-medium leading-snug pt-2">
                    {point.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
