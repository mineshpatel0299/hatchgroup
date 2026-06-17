import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
// import VisionMissionParallax from "@/components/sections/VisionMissionParallax";
import Philosophy from "@/components/sections/Philosophy";
import Services from "@/components/sections/Services";
import ShowcaseSlider from "@/components/sections/ShowcaseSlider";
// import FeaturedProject from "@/components/sections/FeaturedProject";
import ProjectGrid from "@/components/sections/ProjectGrid";
// import Walkthrough from "@/components/sections/Walkthrough";
// import FloorPlan3D from "@/components/sections/FloorPlan3D";
// import Testimonials from "@/components/sections/Testimonials";
import SocialProof from "@/components/sections/SocialProof";
// import FooterCTA from "@/components/sections/FooterCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative bg-background w-full min-h-screen">
      <Hero />
<AboutUs />
      {/* <VisionMissionParallax /> */}
      <Philosophy />
      <Services />
      <ShowcaseSlider />
      {/* <Walkthrough /> */}
      {/* <FloorPlan3D /> */}
      {/* <FeaturedProject /> */}
      <ProjectGrid />
      {/* <Testimonials /> */}
      <SocialProof />
      {/* <FooterCTA /> */}
      <Footer />
    </main>
  );
}
