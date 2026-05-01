"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Hammer, PencilRuler, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const STEPS = [
  { key: "step_1", number: "01", icon: ClipboardList },
  { key: "step_2", number: "02", icon: PencilRuler },
  { key: "step_3", number: "03", icon: Hammer },
  { key: "step_4", number: "04", icon: ShieldCheck },
];

export function Process() {
  const t = useTranslations("process");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <section ref={containerRef} className="bg-white py-24 lg:py-32">
      <div className="container-custom">
        <RevealOnScroll>
          <div className="mb-16 text-center lg:mb-24">
            <p className="section-number mb-4">05 — {t("section_label")}</p>
            <h2 className="text-h2 text-balance font-display font-bold text-primary-900 max-w-3xl mx-auto">
              {t("section_title")}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="relative">
          {/* Animated connecting line - desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-neutral-200 lg:block">
            <motion.div
              style={{ scaleY: lineProgress, transformOrigin: "top" }}
              className="h-full w-full bg-accent-500"
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <RevealOnScroll
                  key={step.key}
                  delay={index * 0.1}
                  direction={isEven ? "right" : "left"}
                >
                  <div
                    className={`relative grid gap-6 lg:grid-cols-2 lg:gap-16 ${
                      !isEven && "lg:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* Content side */}
                    <div
                      className={`lg:text-right ${!isEven && "lg:text-left"}`}
                    >
                      <div
                        className={`inline-flex items-center gap-3 ${
                          !isEven && "lg:flex-row-reverse"
                        }`}
                      >
                        <span className="font-display text-6xl font-extrabold text-accent-500 lg:text-7xl">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-bold text-primary-900 lg:text-3xl">
                        {t(`${step.key}_title`)}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-neutral-600">
                        {t(`${step.key}_desc`)}
                      </p>
                    </div>

                    {/* Icon side with circle indicator */}
                    <div className="relative flex items-center justify-center lg:justify-start">
                      {/* Center dot on line */}
                      <div className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500 ring-4 ring-white lg:block" />

                      {/* Icon card */}
                      <div
                        className={`flex h-32 w-32 items-center justify-center rounded-2xl bg-primary-50 lg:h-40 lg:w-40 ${
                          isEven ? "lg:ml-16" : "lg:mr-16"
                        }`}
                      >
                        <Icon
                          size={48}
                          strokeWidth={1.5}
                          className="text-primary-700"
                        />
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
