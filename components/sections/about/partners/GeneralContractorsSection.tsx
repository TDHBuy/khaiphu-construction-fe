"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/AnimatedSection";
import PartnerSectionHeader from "./PartnerSectionHeader";
import PartnerGrid from "./PartnerGrid";

export default function GeneralContractorsSection() {
  const t = useTranslations("partners.generalContractors");
  const partners = t.raw("partners") as string[];

  return (
    <AnimatedSection className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24 lg:py-[96px]">
        <PartnerSectionHeader
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />
        <PartnerGrid partners={partners} variant="general" />
      </div>
    </AnimatedSection>
  );
}
