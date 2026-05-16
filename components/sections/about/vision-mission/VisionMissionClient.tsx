"use client";

import HeroSection from "./HeroSection";
import VisionSection from "./VisionSection";
import MissionSection from "./MissionSection";
import ApproachSection from "./ApproachSection";
import CommitmentSection from "./CommitmentSection";
export default function VisionMissionClient() {
  return (
    <main className="overflow-x-hidden font-sans">
      <HeroSection />
      <VisionSection />
      <MissionSection />
      <ApproachSection />
      <CommitmentSection />
    </main>
  );
}
