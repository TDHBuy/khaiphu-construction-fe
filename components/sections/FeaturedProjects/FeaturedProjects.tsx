"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  const t = useTranslations("projects");
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
    <section className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="container-custom">
        <RevealOnScroll>
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-number mb-4">03 — {t("section_label")}</p>
              <h2 className="text-h2 text-balance font-display font-bold text-primary-900">
                {t("section_title")}
              </h2>
            </div>

            {/* Scroll controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-700 transition-all",
                  canScrollLeft
                    ? "text-primary-700 hover:bg-primary-700 hover:text-white"
                    : "opacity-30 cursor-not-allowed"
                )}
                aria-label="Previous"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-700 transition-all",
                  canScrollRight
                    ? "text-primary-700 hover:bg-primary-700 hover:text-white"
                    : "opacity-30 cursor-not-allowed"
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
        {MOCK_PROJECTS.map((project, index) => (
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
              image={project.coverImage}
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
              className="border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white"
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
