import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-medium text-[#1C2420] mb-8">Add Project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
