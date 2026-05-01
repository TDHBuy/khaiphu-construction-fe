import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ServiceCard } from "./ServiceCard";
import { StaggerContainer } from "@/components/shared/StaggerContainer";

const SERVICES_DATA = [
  {
    key: "shoring",
    number: "01",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    href: "/dich-vu/shoring",
  },
  {
    key: "larsen",
    number: "02",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
    href: "/dich-vu/cu-larsen",
  },
  {
    key: "kingpost",
    number: "03",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    href: "/dich-vu/kingpost",
  },
] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section className="bg-neutral-50 py-24 lg:py-32">
      <div className="container-custom">
        {/* Section header */}
        <RevealOnScroll>
          <div className="mb-16 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-number mb-4">02 — {t("section_label")}</p>
              <h2 className="text-h2 text-balance font-display font-bold text-primary-900">
                {t("section_title")}
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-neutral-600">
              {t("section_description")}
            </p>
          </div>
        </RevealOnScroll>

        <div className="divider-blueprint mb-16" />

        {/* Cards grid */}
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard
              key={service.key}
              index={index}
              number={service.number}
              title={t(`${service.key}.title`)}
              description={t(`${service.key}.short`)}
              image={service.image}
              href={service.href}
              cta={t(`${service.key}.cta`)}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
