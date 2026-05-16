import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PartnersClient from "@/components/sections/about/partners/PartnersClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `/${locale}/about/partners`,
      languages: {
        vi: "/vi/about/partners",
        en: "/en/about/partners",
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

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PartnersClient />;
}
