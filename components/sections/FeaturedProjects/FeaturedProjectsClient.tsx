"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

export type ProjectCardData = {
  id: string;
  slug: string;
  title: string;
  location: string;
  year: number;
  serviceType: string;
  image: string;
};

export function FeaturedProjectsClient({
  projects,
}: {
  projects: ProjectCardData[];
}) {
  const t = useTranslations("home.projects");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="overflow-hidden bg-primary-900 py-24 lg:py-32">
      <div className="container-custom">
        <RevealOnScroll>
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-number mb-4 text-white/50">
                03 — {t("section_label")}
              </p>
              <h2 className="text-h2 text-balance font-display font-bold text-white">
                {t("section_title")}
              </h2>
            </div>

            {/* Scroll controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 transition-all",
                  canScrollLeft
                    ? "text-white hover:border-white hover:bg-white hover:text-primary-900"
                    : "opacity-25 cursor-not-allowed",
                )}
                aria-label="Previous"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 transition-all",
                  canScrollRight
                    ? "text-white hover:border-white hover:bg-white hover:text-primary-900"
                    : "opacity-25 cursor-not-allowed",
                )}
                aria-label="Next"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Horizontal scroll container - breaks out of container */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth px-4 sm:px-8 lg:px-12 xl:px-16"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            style={{ scrollSnapAlign: "start" }}
            className={cn(index === 0 && "lg:ml-0")}
          >
            <ProjectCard
              slug={project.slug}
              title={project.title}
              location={project.location}
              year={project.year}
              serviceType={project.serviceType}
              image={project.image}
            />
          </div>
        ))}

        {/* Spacer for last card */}
        <div className="w-4 shrink-0 lg:w-12" />
      </div>

      {/* View all CTA */}
      <div className="container-custom mt-12">
        <RevealOnScroll>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 text-dark font-semibold uppercase tracking-wide
      hover:bg-accent-500 hover:border-accent-500 hover:text-white
      transition-all duration-300"
            >
              <Link href="/du-an">
                {t("view_all")}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
