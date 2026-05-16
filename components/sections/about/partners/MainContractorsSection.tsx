"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/AnimatedSection";
import PartnerSectionHeader from "./PartnerSectionHeader";
import PartnerGrid from "./PartnerGrid";

export default function MainContractorsSection() {
  const t = useTranslations("partners.mainContractors");
  const partners = t.raw("partners") as string[];

  return (
    <AnimatedSection className="bg-[#f8fafd]">
      <div className="max-w-[1200px] mx-auto px-6 py-24 lg:py-[96px]">
        <PartnerSectionHeader
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />
        <PartnerGrid partners={partners} variant="main" />
      </div>
    </AnimatedSection>
  );
}
