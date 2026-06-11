import Hero from "@/components/sections/Hero";
import VisionMissionParallax from "@/components/sections/VisionMissionParallax";
import Philosophy from "@/components/sections/Philosophy";
import Services from "@/components/sections/Services";
import FeaturedProject from "@/components/sections/FeaturedProject";
import ProjectGrid from "@/components/sections/ProjectGrid";
import SocialProof from "@/components/sections/SocialProof";
import FooterCTA from "@/components/sections/FooterCTA";

export default function Home() {
  return (
    <main className="relative bg-background w-full min-h-screen">
      <Hero />
      <VisionMissionParallax />
      <Philosophy />
      <Services />
      <FeaturedProject />
      <ProjectGrid />
      <SocialProof />
      <FooterCTA />
    </main>
  );
}
