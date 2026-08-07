import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/projects-repo";
import { isDatabaseConfigured } from "@/lib/db";

export default async function AdminDashboardPage() {
  const projects = await getAllProjects();
  const published = projects.filter((p) => p.published).length;
  const byCategory = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const recent = [...projects].slice(-5).reverse();
  const dbConfigured = isDatabaseConfigured();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-[#1C2420]">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of your projects.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-[#00251f] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-5 py-3 hover:bg-[#00251f]/90 transition-colors text-center"
        >
          + Add Project
        </Link>
      </div>

      {!dbConfigured && (
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          <strong className="font-medium">No database connected yet.</strong> You&apos;re viewing the site&apos;s
          existing static project data. Add <code className="font-mono text-xs">DATABASE_URL</code> (Neon) and run{" "}
          <code className="font-mono text-xs">npm run db:seed</code> to start editing.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Projects" value={projects.length} />
        <StatCard label="Published" value={published} />
        {Object.entries(byCategory).map(([category, n]) => (
          <StatCard key={category} label={category} value={n} />
        ))}
      </div>

      <h2 className="text-[11px] tracking-[0.2em] uppercase font-medium text-slate-500 mb-4">Recently Added</h2>
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        {recent.map((p) => (
          <Link
            key={p.id}
            href={`/admin/projects/${p.id}/edit`}
            className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors"
          >
            <div className="relative w-14 h-10 rounded-md overflow-hidden bg-slate-100 shrink-0">
              {p.heroImage && <Image src={p.heroImage} alt="" fill sizes="56px" className="object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#1C2420] truncate">{p.title}</p>
              <p className="text-xs text-slate-400">
                {p.category} · {p.year}
              </p>
            </div>
            {!p.published && (
              <span className="text-[10px] tracking-wider uppercase text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">
                Draft
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
      <p className="text-2xl font-medium text-[#1C2420] tabular-nums">{value}</p>
      <p className="text-[11px] tracking-[0.1em] uppercase text-slate-400 mt-1">{label}</p>
    </div>
  );
}
