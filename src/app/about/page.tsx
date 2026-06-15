import type { Metadata } from "next";
import AboutPageContent from "@/components/sections/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us | Hatch Group — Premium Indian Interior Design Studio",
  description:
    "Since 2014, Hatch Group has quietly redefined the language of luxury interiors across India. Every project is an act of authorship, not decoration.",
};

export default function AboutPage() {
  return (
    <main className="relative bg-background w-full min-h-screen">
      <AboutPageContent />
    </main>
  );
}
