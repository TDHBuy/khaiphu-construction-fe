"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Layers, MoveDown, Wrench } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/components/shared/animations";
import type { LucideIcon } from "lucide-react";

/* Icon + placeholder image per card — user replaces imgSrc later */
const CARD_META: { Icon: LucideIcon; imgSrc: string }[] = [
  {
    Icon: Layers,
    imgSrc: "https://picsum.photos/seed/shoring-card/600/400",
  },
  {
    Icon: MoveDown,
    imgSrc: "https://picsum.photos/seed/larsen-card/600/400",
  },
  {
    Icon: Wrench,
    imgSrc: "https://picsum.photos/seed/steel-card/600/400",
  },
];

export default function PositioningSection() {
  const t = useTranslations("coreCompetencies.positioning");
  const pills = t.raw("pills") as string[];

  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Intro — centered, max 760 */}
        <div className="max-w-[760px] mx-auto text-center mb-14">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block w-7 h-[2px] bg-[#ffcb05]" />
              <span className="text-[#ffcb05] text-xs font-semibold uppercase tracking-[0.22em] font-sans">
                {t("label")}
              </span>
              <span className="block w-7 h-[2px] bg-[#ffcb05]" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <p
              className="font-sans text-neutral-600 m-0"
              style={{ fontSize: "18px", lineHeight: 1.7 }}
            >
              {t("body")}
            </p>
          </RevealOnScroll>
        </div>

        {/* Image cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {pills.map((title, i) => {
            const { Icon, imgSrc } = CARD_META[i];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                animate={gridInView ? "visible" : "hidden"}
                custom={i * 0.1}
                className="group relative overflow-hidden"
                style={{ borderRadius: "12px", aspectRatio: "3/2" }}
              >
                {/* Background image */}
                <Image
                  src={imgSrc}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />

                {/* Gradient overlay — navy bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,77,156,0.88) 0%, rgba(10,77,156,0.4) 50%, transparent 100%)",
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center bg-white/10 border border-white/25 backdrop-blur-sm"
                    style={{ width: "56px", height: "56px", borderRadius: "12px" }}
                  >
                    <Icon size={26} color="#ffcb05" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <span
                    className="font-display font-bold text-white uppercase text-center"
                    style={{ fontSize: "18px", lineHeight: 1.2, letterSpacing: "0.04em" }}
                  >
                    {title}
                  </span>
                </div>

                {/* Bottom yellow bar on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ffcb05] transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
