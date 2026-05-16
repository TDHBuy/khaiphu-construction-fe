"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/shared/animations";

type Props = {
  label: string;
  title: string;
  description: string;
};

export default function PartnerSectionHeader({ label, title, description }: Props) {
  return (
    <motion.div variants={fadeUp} custom={0} className="mb-12">
      {/* Eyebrow */}
      <div className="flex items-center gap-[14px] mb-5">
        <span className="block w-10 h-[3px] bg-[#ffcb05] flex-shrink-0" />
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a4d9c]">
          {label}
        </span>
      </div>

      <h2 className="text-[clamp(24px,3.5vw,38px)] font-extrabold text-[#0d1b3e] tracking-tight leading-tight mb-4">
        {title}
      </h2>

      <p className="max-w-[680px] text-[#4a5568] text-[15px] leading-[1.8]">
        {description}
      </p>
    </motion.div>
  );
}
