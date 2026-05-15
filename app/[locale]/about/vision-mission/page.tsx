import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import VisionMissionClient from "@/components/sections/about/vision-mission/VisionMissionClient";

// ─── Props ─────────────────────────────────────────────────────────────────
type Props = {
  params: Promise<{ locale: string }>;
};

// ─── Metadata (SEO) ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visionMission" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `/${locale}/about/vision-mission`,
      languages: {
        vi: "/vi/about/vision-mission",
        en: "/en/about/vision-mission",
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      locale,
      type: "website",
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function VisionMissionPage({ params }: Props) {
  const { locale } = await params;

  // Required by next-intl App Router for static rendering
  setRequestLocale(locale);

  return <VisionMissionClient />;
}
