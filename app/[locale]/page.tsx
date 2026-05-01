import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { CTA } from "@/components/sections/CTA";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <Hero/>
      <Services/>
      <FeaturedProjects/>
      <Stats />
      <Process/>
      <AboutTeaser/>
      <CTA/>
    </>
  );
}
