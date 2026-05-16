"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/shared/animations";

type Props = {
  name: string;
  index: number;
};

export default function PartnerCard({ name, index }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      custom={0.05 * index}
      className="group relative flex flex-col items-center text-center bg-white border border-[#e8edf5] rounded-lg px-5 pt-7 pb-6 overflow-hidden transition-all duration-[280ms] ease-in hover:-translate-y-[3px] hover:border-[rgba(10,77,156,0.25)] hover:shadow-[0_8px_32px_rgba(10,77,156,0.1)] cursor-default"
    >
      {/* Logo placeholder — aspect-ratio 1:1 so swapping in <img> won't break layout */}
      <div
        className="w-20 rounded-xl bg-gradient-to-br from-[#0a4d9c] to-[#1a6dd4] flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ aspectRatio: "1 / 1" }}
      >
        <span className="text-[#ffcb05] font-bold text-[10px] text-center leading-snug px-1.5 line-clamp-3 select-none break-words">
          {name}
        </span>
      </div>

      {/* Company name */}
      <span className="mt-4 text-[15px] font-bold text-[#0d1b3e] leading-snug">
        {name}
      </span>

      {/* Bottom hover accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0a4d9c] to-[#ffcb05] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
    </motion.div>
  );
}
