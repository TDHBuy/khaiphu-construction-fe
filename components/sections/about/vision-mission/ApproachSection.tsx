"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionLabel from "@/components/shared/SectionLabel";
import { fadeUp } from "@/components/shared/animations";

type Step = { number: string; title: string; description: string };

function StepNode({ number, isLast }: { number: string; isLast: boolean }) {
  return (
    <div
      className={`
        w-16 h-16 rounded-sm flex items-center justify-center font-bold text-lg z-10 relative
        border-2 transition-all duration-300
        ${
          isLast
            ? "bg-[#FFCB05] border-[#FFCB05] text-[#0A4D9C]"
            : "bg-white border-[#0A4D9C]/20 text-[#0A4D9C] hover:border-[#0A4D9C] hover:bg-[#0A4D9C]/5"
        }
      `}
    >
      {number}
    </div>
  );
}

export default function ApproachSection() {
  const t = useTranslations("visionMission.approach");
  const steps = t.raw("steps") as Step[];

  return (
    <AnimatedSection className="bg-gray-50 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* ── Header ── */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
          <SectionLabel label={t("label")} labelEn={t("labelEn")} />
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A4D9C] leading-tight">
            {t("heading")}
          </h2>
        </motion.div>

        {/* ── Desktop: horizontal timeline ── */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connector track */}
            <div className="absolute top-8 left-[calc(10%+32px)] right-[calc(10%+32px)] h-[2px] bg-[#0A4D9C]/15" />

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={0.1 + i * 0.1}
                  className="flex flex-col items-center text-center"
                >
                  <StepNode
                    number={step.number}
                    isLast={i === steps.length - 1}
                  />
                  <h4 className="text-[#0A4D9C] font-semibold text-sm leading-snug mt-5 mb-2 px-1">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed px-1">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile: vertical timeline ── */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={0.05 * i}
                className="flex gap-5"
              >
                {/* Node + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-12 h-12 rounded-sm flex items-center justify-center font-bold text-sm flex-shrink-0
                      border-2
                      ${
                        isLast
                          ? "bg-[#FFCB05] border-[#FFCB05] text-[#0A4D9C]"
                          : "bg-white border-[#0A4D9C]/20 text-[#0A4D9C]"
                      }
                    `}
                  >
                    {step.number}
                  </div>
                  {!isLast && (
                    <div className="w-[2px] flex-1 bg-[#0A4D9C]/10 my-1 min-h-[2.5rem]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <h4 className="text-[#0A4D9C] font-semibold text-base leading-snug mb-1">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
