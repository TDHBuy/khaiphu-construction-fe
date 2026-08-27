import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

const FeaturedProjects = dynamic(() =>
  import("@/components/sections/FeaturedProjects").then((m) => ({
    default: m.FeaturedProjects,
  })),
);
const Stats = dynamic(() =>
  import("@/components/sections/Stats").then((m) => ({ default: m.Stats })),
);
const Process = dynamic(() =>
  import("@/components/sections/Process").then((m) => ({ default: m.Process })),
);
const AboutTeaser = dynamic(() =>
  import("@/components/sections/AboutTeaser").then((m) => ({
    default: m.AboutTeaser,
  })),
);
const CTA = dynamic(() =>
  import("@/components/sections/CTA").then((m) => ({ default: m.CTA })),
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      {/* <Stats /> */}
      <Process />
      <AboutTeaser />
      <CTA />
    </>
  );
}
