"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Layers, Zap, Users, Clock } from "lucide-react";
import { fadeUp } from "@/components/shared/animations";
import type { LucideIcon } from "lucide-react";

/* Icon + placeholder image per card — user replaces imgSrc later */
const CARD_META: { Icon: LucideIcon; imgSrc: string }[] = [
  {
    Icon: Layers,
    imgSrc: "/images/about/deployment-capabilities/parallel-construction.jpg",
  },
  {
    Icon: Zap,
    imgSrc: "/images/about/deployment-capabilities/flexible-resources.jpg",
  },
  {
    Icon: Users,
    imgSrc: "/images/about/deployment-capabilities/effective-coordination.jpg",
  },
  {
    Icon: Clock,
    imgSrc: "/images/about/deployment-capabilities/schedule-insurance.jpg",
  },
];

type DeploymentItem = { number: string; name: string; desc: string };

export default function DeploymentSection() {
  const t = useTranslations("coreCompetencies.deployment");
  const items = t.raw("items") as DeploymentItem[];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "#0a4d9c" }}
      ref={ref}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-3"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="block w-7 h-[2px] bg-[#ffcb05]" />
            <span className="text-[#ffcb05] font-sans font-semibold uppercase text-xs tracking-[0.2em]">
              {t("sectionTitle")}
            </span>
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.08}
          className="mb-10 font-sans text-[#ffcb05]"
          style={{ fontSize: "17px" }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Grid: 4 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const { Icon, imgSrc } = CARD_META[i];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.15 + i * 0.08}
                className="group relative overflow-hidden flex flex-col"
                style={{ borderRadius: "12px", borderTop: "3px solid #ffcb05" }}
                whileHover={{ y: -4 }}
              >
                {/* Background image */}
                <Image
                  src={imgSrc}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(5,31,68,0.96) 0%, rgba(10,77,156,0.80) 50%, rgba(10,77,156,0.55) 100%)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col p-7 h-full min-h-[220px]">
                  {/* Icon + Name — same row */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex items-center justify-center flex-shrink-0 bg-white/10 border border-white/20 backdrop-blur-sm"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                      }}
                    >
                      <Icon size={20} color="#ffcb05" strokeWidth={1.5} />
                    </div>
                    <span
                      className="font-display font-bold text-white uppercase"
                      style={{ fontSize: "16px", lineHeight: 1.2 }}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="font-sans m-0"
                    style={{
                      fontSize: "17px",
                      color: "rgba(255,255,255,0.70)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
