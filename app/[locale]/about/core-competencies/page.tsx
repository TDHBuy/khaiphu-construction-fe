import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CoreCompetenciesClient from "@/components/sections/about/core-competencies/CoreCompetenciesClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "coreCompetencies" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `/${locale}/about/core-competencies`,
      languages: {
        vi: "/vi/about/core-competencies",
        en: "/en/about/core-competencies",
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

export default async function CoreCompetenciesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CoreCompetenciesClient />;
}
