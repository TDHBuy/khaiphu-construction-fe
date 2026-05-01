import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function CTA() {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-primary-900 py-20 lg:py-28">
      {/* Decorative accent bar */}
      <div className="absolute left-0 top-0 h-2 w-full bg-accent-500" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(245, 180, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(10, 77, 156, 0.5) 0%, transparent 50%)",
        }}
      />

      <div className="container-custom relative">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-number mb-4 text-accent-400">07 — CONTACT</p>
            <h2 className="text-balance font-display text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-200">
              {t("description")}
            </p>

            <Button
              asChild
              size="lg"
              className="mt-10 h-14 bg-accent-500 px-10 text-base text-neutral-900 hover:bg-accent-400 group"
            >
              <Link href="/lien-he">
                {t("button")}
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
