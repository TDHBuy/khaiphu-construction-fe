"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface ProjectCardProps {
  slug: string;
  title: string;
  location: string;
  year: number;
  serviceType: string;
  image: string;
}

export function ProjectCard({
  slug,
  title,
  location,
  year,
  serviceType,
  image,
}: ProjectCardProps) {
  const t = useTranslations();

  return (
    <Link
      href={`/du-an/${slug}`}
      className="group relative flex h-[480px] w-[340px] shrink-0 flex-col overflow-hidden rounded-lg md:h-[560px] md:w-[420px]"
    >
      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" />

      {/* Top metadata */}
      <div className="relative z-10 flex items-start justify-between p-6">
        <span className="bg-accent-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-900">
          {t(`services.${serviceType}.title`)}
        </span>
        <span className="font-display font-bold text-white/80">{year}</span>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 mt-auto p-6">
        <div className="flex items-center gap-2 text-sm text-white/80">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-white md:text-2xl">
          {title}
        </h3>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-accent-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-10px]">
          <span>{t("projects.view_detail")}</span>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </Link>
  );
}
