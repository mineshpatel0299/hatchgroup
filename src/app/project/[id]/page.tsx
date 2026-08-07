import { notFound } from "next/navigation";
import ProjectDetailContent from "./ProjectDetailContent";
import { getPublishedProjects } from "@/lib/projects-repo";

type Params = Promise<{ id: string }>;

export default async function ProjectDetailPage(props: { params: Params }) {
  const params = await props.params;

  const projects = await getPublishedProjects();
  if (projects.length === 0) notFound();

  const project = projects.find((p) => p.slug === params.id) ?? projects[0];
  const currentIndex = projects.indexOf(project);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <ProjectDetailContent
      id={params.id}
      project={{
        title: project.title,
        category: project.category,
        year: project.year,
        description: project.description,
        details: project.details,
        location: project.location,
        siteArea: project.siteArea,
        projectArea: project.projectArea,
        projectType: project.projectType,
        projectLanguage: project.projectLanguage,
        projectScope: project.projectScope,
        images: project.images,
        image2: project.heroImage,
      }}
      nextProjectId={nextProject.slug}
      nextProject={{ category: nextProject.category }}
    />
  );
}
