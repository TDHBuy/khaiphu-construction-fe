"use client";

import HeroSection from "./HeroSection";
import GeneralContractorsSection from "./GeneralContractorsSection";
import MainContractorsSection from "./MainContractorsSection";
import CtaSection from "./CtaSection";

export default function PartnersClient() {
  return (
    <main className="overflow-x-hidden font-sans">
      <HeroSection />
      <GeneralContractorsSection />
      <MainContractorsSection />
      <CtaSection />
    </main>
  );
}
