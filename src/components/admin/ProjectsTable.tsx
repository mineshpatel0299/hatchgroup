"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteProject, togglePublished, reorderProjects } from "@/app/admin/actions";
import type { ProjectRecord } from "@/lib/projects-repo";

export default function ProjectsTable({ initialProjects }: { initialProjects: ProjectRecord[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function move(index: number, dir: -1 | 1) {
    const next = [...projects];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setProjects(next);
    startTransition(async () => {
      await reorderProjects(next.map((p) => p.id));
      router.refresh();
    });
  }

  function handleToggle(id: number, published: boolean) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, published } : p)));
    startTransition(async () => {
      await togglePublished(id, published);
      router.refresh();
    });
  }

  function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    startTransition(async () => {
      await deleteProject(id);
      router.refresh();
    });
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-[11px] tracking-[0.1em] uppercase text-slate-400">
            <th className="px-5 py-3 font-medium w-20"></th>
            <th className="px-2 py-3 font-medium">Project</th>
            <th className="px-2 py-3 font-medium">Category</th>
            <th className="px-2 py-3 font-medium">Year</th>
            <th className="px-2 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {projects.map((p, i) => (
            <tr key={p.id} className={pending ? "opacity-60" : undefined}>
              <td className="px-5 py-3">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => move(i, -1)}
                    className="text-slate-400 hover:text-[#1C2420] disabled:opacity-20 text-xs leading-none"
                    aria-label="Move up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    disabled={i === projects.length - 1}
                    onClick={() => move(i, 1)}
                    className="text-slate-400 hover:text-[#1C2420] disabled:opacity-20 text-xs leading-none"
                    aria-label="Move down"
                  >
                    ▼
                  </button>
                </div>
              </td>
              <td className="px-2 py-3">
                <Link href={`/admin/projects/${p.id}/edit`} className="flex items-center gap-3 group">
                  <div className="relative w-14 h-10 rounded-md overflow-hidden bg-slate-100 shrink-0">
                    {p.heroImage && <Image src={p.heroImage} alt="" fill sizes="56px" className="object-cover" />}
                  </div>
                  <span className="font-medium text-[#1C2420] group-hover:text-[#A98C5F] transition-colors">
                    {p.title}
                  </span>
                </Link>
              </td>
              <td className="px-2 py-3 text-slate-500">{p.category}</td>
              <td className="px-2 py-3 text-slate-500">{p.year}</td>
              <td className="px-2 py-3">
                <button
                  type="button"
                  onClick={() => handleToggle(p.id, !p.published)}
                  className={
                    p.published
                      ? "text-[11px] tracking-wider uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1"
                      : "text-[11px] tracking-wider uppercase text-slate-400 bg-slate-50 border border-slate-200 rounded-full px-2.5 py-1"
                  }
                >
                  {p.published ? "Published" : "Draft"}
                </button>
              </td>
              <td className="px-5 py-3 text-right whitespace-nowrap">
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="text-slate-500 hover:text-[#1C2420] text-xs mr-4"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id, p.title)}
                  className="text-red-400 hover:text-red-600 text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-sm">
                No projects yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
