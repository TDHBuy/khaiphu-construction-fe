"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
  index: number;
}

export function ServiceCard({
  number,
  title,
  description,
  image,
  href,
  cta,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Link
        href={href}
        className="group block h-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />

          {/* Number badge */}
          <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center bg-accent-500 font-display font-bold text-primary-900">
            {number}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <h3
            className={cn(
              "font-display text-xl font-bold text-neutral-900 lg:text-2xl",
              "transition-colors group-hover:text-primary-700"
            )}
          >
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 lg:text-base">
            {description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary-700">
            <span>{cta}</span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
