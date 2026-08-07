import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/projects-repo";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = Number(id);
  if (Number.isNaN(projectId)) notFound();

  const project = await getProjectById(projectId);
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-medium text-[#1C2420] mb-8">Edit Project</h1>
      <ProjectForm mode="edit" projectId={project.id} initial={project} />
    </div>
  );
}
