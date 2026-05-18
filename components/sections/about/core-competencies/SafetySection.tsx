"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "@/components/shared/animations";

type SafetyNode = { number: string; name: string; desc: string };

function SafetyCard({
  node,
  index,
  inView,
}: {
  node: SafetyNode;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index * 0.08}
      className="group flex flex-col"
      style={{
        background: "#fff",
        borderRadius: "12px",
        borderTop: "3px solid #ffcb05",
        boxShadow: "0 4px 24px rgba(10,77,156,.08)",
        padding: "32px 28px",
        transition: "box-shadow .3s ease, transform .3s ease",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 40px rgba(10,77,156,.16)",
      }}
    >
      {/* Number */}
      <span
        className="font-display font-extrabold text-[#ffcb05] block"
        style={{ fontSize: "48px", lineHeight: 1 }}
      >
        {node.number}
      </span>

      {/* Name */}
      <span
        className="font-display font-bold text-[#0a4d9c] uppercase block mt-4 mb-3"
        style={{ fontSize: "18px", lineHeight: 1.2 }}
      >
        {node.name}
      </span>

      {/* Divider */}
      <span className="block w-8 h-[2px] bg-[#ffcb05] mb-3" />

      {/* Description */}
      <p
        className="font-sans m-0 text-neutral-500"
        style={{ fontSize: "14px", lineHeight: 1.65 }}
      >
        {node.desc}
      </p>
    </motion.div>
  );
}

export default function SafetySection() {
  const t = useTranslations("coreCompetencies.safety");
  const nodes = t.raw("nodes") as SafetyNode[];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Section title */}
        <motion.div
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

        {/* Grid — 5 cards */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
          {nodes.map((node, i) => (
            <SafetyCard key={i} node={node} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
