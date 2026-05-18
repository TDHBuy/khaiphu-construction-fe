"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "@/components/shared/animations";

const IMAGE_SEEDS: Record<string, string> = {
  shoring: "/images/about/main-capabilities/shoring.jpg",
  larsenKingpost: "/images/about/main-capabilities/larsen-kingpost.jpg",
  kingpostExtraction: "/images/about/main-capabilities/kingpost-extraction.jpg",
  steelStructureConstruction:
    "/images/main-capabilities/steel-structure-construction.jpg",
};

type CapabilityItem = {
  label: string;
  title: string;
  body: string;
  checklist: string[];
  id: string;
};

function CapabilityRow({
  item,
  index,
}: {
  item: CapabilityItem;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  /* Odd index (0, 2): image left — Even index (1, 3): text left */
  const imageLeft = index % 2 === 0;
  const imgVariant = imageLeft ? slideLeft : slideRight;
  const txtVariant = imageLeft ? slideRight : slideLeft;

  const ImageCol = (
    <div className="md:p-10">
      <motion.div
        variants={imgVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0}
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/3" }}
      >
        <Image
          src={IMAGE_SEEDS[item.id]}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          loading="eager"
        />
      </motion.div>
    </div>
  );

  const TextCol = (
    <motion.div
      variants={txtVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={0.15}
      className="relative flex flex-col justify-center"
      style={{ padding: "clamp(40px,5vw,72px)" }}
    >
      {/* Watermark number */}
      {/* <span
        className="absolute top-4 right-6 font-display font-extrabold select-none pointer-events-none"
        style={{
          fontSize: "clamp(64px,8vw,96px)",
          color: "rgba(10,77,156,0.08)",
          lineHeight: 1,
        }}
      >
        {item.number}
      </span> */}

      {/* Label */}
      <div className="flex items-center gap-3 mb-4">
        <span className="block w-7 h-[2px] bg-[#ffcb05] flex-shrink-0" />
        <span className="text-[#ffcb05] font-sans font-semibold uppercase text-[11px] tracking-[0.22em]">
          {item.label}
        </span>
      </div>

      {/* Title */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0.2}
        className="font-display font-bold text-[#0a4d9c] uppercase mb-4"
        style={{ fontSize: "clamp(24px,3.5vw,38px)", lineHeight: 1.1 }}
      >
        {item.title}
      </motion.h2>

      {/* Body paragraph */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0.28}
        className="font-sans text-neutral-500 m-0"
        style={{ fontSize: "16px", lineHeight: 1.75 }}
      >
        {item.body}
      </motion.p>
    </motion.div>
  );

  return (
    <div ref={ref} className="border-t border-[#eaedf3]">
      {/* Desktop: 60/40 alternating grid */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: imageLeft ? "3fr 2fr" : "2fr 3fr",
        }}
      >
        {imageLeft ? (
          <>
            {ImageCol}
            {TextCol}
          </>
        ) : (
          <>
            {TextCol}
            {ImageCol}
          </>
        )}
      </div>

      {/* Mobile: image on top, text below */}
      <div className="md:hidden flex flex-col">
        {ImageCol}
        {TextCol}
      </div>
    </div>
  );
}

export default function MainCapabilitiesSection() {
  const t = useTranslations("coreCompetencies.mainCapabilities");
  const items = t.raw("items") as CapabilityItem[];

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section style={{ background: "#f4f6fa" }}>
      {/* Section header */}
      <motion.div
        ref={headerRef}
        variants={fadeUp}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        custom={0}
        className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-16 pb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <span className="block w-7 h-[2px] bg-[#ffcb05]" />
          <span className="text-[#ffcb05] font-sans font-semibold uppercase text-xs tracking-[0.2em]">
            {t("sectionTitle")}
          </span>
        </div>
      </motion.div>

      {/* Rows */}
      {items.map((item, i) => (
        <CapabilityRow key={i} item={item} index={i} />
      ))}
    </section>
  );
}
