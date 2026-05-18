"use client";

import HeroSection from "./HeroSection";
import MainCapabilitiesSection from "./MainCapabilitiesSection";
import EquipmentSection from "./EquipmentSection";
import DeploymentSection from "./DeploymentSection";
import SafetySection from "./SafetySection";

export default function CoreCompetenciesClient() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <MainCapabilitiesSection />
      <EquipmentSection />
      <DeploymentSection />
      <SafetySection />
    </main>
  );
}
