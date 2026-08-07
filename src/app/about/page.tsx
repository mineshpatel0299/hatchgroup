import type { Metadata } from "next";
import AboutPageContent from "@/components/sections/AboutPageContent";
import { getPublishedProjects, toLegacyProject } from "@/lib/projects-repo";

export const metadata: Metadata = {
  title: "About Us | Hatch Group — Premium Indian Interior Design Studio",
  description:
    "Since 2014, Hatch Group has quietly redefined the language of luxury interiors across India. Every project is an act of authorship, not decoration.",
};

export default async function AboutPage() {
  const projects = (await getPublishedProjects()).map(toLegacyProject);

  return (
    <main className="relative bg-background w-full min-h-screen">
      <AboutPageContent projects={projects} />
    </main>
  );
}
