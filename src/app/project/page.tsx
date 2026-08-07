import ProjectScrollSection from "../../components/sections/ProjectScrollSection";
import Footer from "../../components/sections/Footer";
import { getPublishedProjects, toLegacyProject } from "@/lib/projects-repo";

export default async function ProjectPage() {
  const projects = (await getPublishedProjects()).map(toLegacyProject);

  return (
    <main className="luxe-emerald min-h-screen">
      <ProjectScrollSection projects={projects} />
      <Footer />
    </main>
  );
}
