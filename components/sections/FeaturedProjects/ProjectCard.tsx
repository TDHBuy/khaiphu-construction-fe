"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

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
  const tNav = useTranslations("navigation");
  const tProjects = useTranslations("home.projects");

  return (
    <Link
      href={`/du-an/${slug}`}
      className="group flex shrink-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg
        w-[318px]
        md:w-[440px]
        lg:w-[392px]"
    >
      {/* Thumbnail */}
      <div className="relative h-[220px] overflow-hidden md:h-[280px] lg:h-[260px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 318px, (max-width: 1024px) 440px, 392px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={false}
        />
        <span className="absolute left-4 top-4 bg-accent-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
          {serviceType}
        </span>
      </div>

      {/* Content below image */}
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-primary-500">
          <MapPin size={12} />
          <span>{location}</span>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-primary-900 md:text-xl">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-accent-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>{tProjects("view_detail")}</span>
          <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
}
