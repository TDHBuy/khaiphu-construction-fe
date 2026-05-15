"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function AnimatedSection({
  children,
  className = "",
  id,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}
