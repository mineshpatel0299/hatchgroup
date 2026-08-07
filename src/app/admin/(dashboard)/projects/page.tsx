import Link from "next/link";
import { getAllProjects } from "@/lib/projects-repo";
import ProjectsTable from "@/components/admin/ProjectsTable";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-[#1C2420]">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">{projects.length} total — use the arrows to reorder.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-[#00251f] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-5 py-3 hover:bg-[#00251f]/90 transition-colors text-center"
        >
          + Add Project
        </Link>
      </div>

      <ProjectsTable initialProjects={projects} />
    </div>
  );
}
