"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { stagger: number; delay: number }) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.delay,
      staggerChildren: custom.stagger,
    },
  }),
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.12,
  initialDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={{ stagger: staggerDelay, delay: initialDelay }}
    >
      {children}
    </motion.div>
  );
}

// Child variant để dùng cho mọi item
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
