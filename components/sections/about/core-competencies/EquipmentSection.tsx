"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "@/components/shared/animations";

const EQUIPMENT_IMAGES: Record<string, string> = {
  silentPiler: "/images/about/equipments/silent-piler.jpg",
  crawlerExcavator: "/images/about/equipments/crawler-excavator.jpg",
  crawlerCrane: "/images/about/equipments/crawler-crane.jpg",
  hydraulicKingpost: "/images/about/equipments/hydraulic-kingpost.png",
  weldingMachines: "/images/about/equipments/welding-machines.png",
};

type EquipmentItem = { title: string; desc: string; id: string };

function EquipmentCard({
  item,
  index,
  inView,
}: {
  item: EquipmentItem;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index * 0.08}
      className="group flex flex-col overflow-hidden bg-white"
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(10,77,156,.10)",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 40px rgba(10,77,156,.18)",
      }}
    >
      {/* Image 4/5 */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
        <Image
          src={EQUIPMENT_IMAGES[item.id]}
          alt={item.title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="eager"
        />
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h4
          className="font-display font-bold text-[#0a4d9c] mb-2"
          style={{ fontSize: "20px", lineHeight: 1.2 }}
        >
          {item.title}
        </h4>
        <p
          className="font-sans m-0"
          style={{ fontSize: "14px", color: "#3a4a5c", lineHeight: 1.65 }}
        >
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function EquipmentSection() {
  const t = useTranslations("coreCompetencies.equipment");
  const items = t.raw("items") as EquipmentItem[];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Section title */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="block w-7 h-[2px] bg-[#ffcb05]" />
            <span className="text-[#ffcb05] font-sans font-semibold uppercase text-xs tracking-[0.2em]">
              {t("sectionTitle")}
            </span>
          </div>
        </motion.div>

        {/* Grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {items.map((item, i) => (
            <EquipmentCard key={i} item={item} index={i} inView={inView} />
          ))}
        </div>

        {/* Callout bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.5}
          className="mt-8 flex items-start gap-4"
          style={{
            background: "#0a4d9c",
            borderRadius: "12px",
            padding: "24px 32px",
          }}
        >
          <span
            className="flex-shrink-0 text-[#ffcb05] select-none"
            style={{
              fontSize: "40px",
              lineHeight: 0.8,
              fontFamily: "Georgia, serif",
            }}
          >
            "
          </span>
          <p
            className="m-0 italic font-sans text-white/80"
            style={{ fontSize: "16px", lineHeight: 1.65 }}
          >
            {t("callout")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
