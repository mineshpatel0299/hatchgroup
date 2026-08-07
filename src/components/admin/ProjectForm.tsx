"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import { createProject, updateProject, type ProjectInput } from "@/app/admin/actions";
import type { ProjectRecord } from "@/lib/projects-repo";

interface ProjectFormProps {
  mode: "create" | "edit";
  projectId?: number;
  initial?: ProjectRecord;
}

const emptyInput: ProjectInput = {
  slug: "",
  title: "",
  category: "Residential",
  year: String(new Date().getFullYear()),
  description: "",
  details: "",
  location: "",
  siteArea: "",
  projectArea: "",
  projectType: "",
  projectLanguage: "Contemporary",
  projectScope: "",
  heroImage: "",
  images: [],
  published: true,
};

function toInput(p: ProjectRecord): ProjectInput {
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    year: p.year,
    description: p.description,
    details: p.details,
    location: p.location,
    siteArea: p.siteArea,
    projectArea: p.projectArea,
    projectType: p.projectType,
    projectLanguage: p.projectLanguage,
    projectScope: p.projectScope,
    heroImage: p.heroImage,
    images: p.images,
    published: p.published,
  };
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.15em] uppercase font-medium text-slate-500 mb-1.5">
        {label}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-slate-400 mt-1">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A98C5F]/40 focus:border-[#A98C5F] transition-colors";

export default function ProjectForm({ mode, projectId, initial }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectInput>(initial ? toInput(initial) : emptyInput);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function set<K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.slug.trim() || !form.title.trim() || !form.heroImage) {
      setError("Slug, title and a hero image are required.");
      return;
    }

    startTransition(async () => {
      const result =
        mode === "create" ? await createProject(form) : await updateProject(projectId as number, form);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl pb-16">
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-[11px] tracking-[0.2em] uppercase font-medium text-slate-500 mb-5">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Title">
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Prime Living"
              required
            />
          </Field>
          <Field label="URL Slug" hint="Used as /project/<slug> — keep it short, no spaces.">
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) => set("slug", e.target.value.trim())}
              placeholder="prime-living"
              required
            />
          </Field>
          <Field label="Category">
            <input
              className={inputClass}
              list="category-options"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              required
            />
            <datalist id="category-options">
              <option value="Residential" />
              <option value="Commercial" />
            </datalist>
          </Field>
          <Field label="Year">
            <input className={inputClass} value={form.year} onChange={(e) => set("year", e.target.value)} required />
          </Field>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-[11px] tracking-[0.2em] uppercase font-medium text-slate-500 mb-5">Copy</h2>
        <div className="grid grid-cols-1 gap-5">
          <Field label="Short Description" hint="Shown on the listing grid and as the detail page intro.">
            <textarea
              className={inputClass}
              rows={2}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              required
            />
          </Field>
          <Field label="Full Details" hint="Longer paragraph shown on the project detail page.">
            <textarea
              className={inputClass}
              rows={4}
              value={form.details}
              onChange={(e) => set("details", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-[11px] tracking-[0.2em] uppercase font-medium text-slate-500 mb-5">
          Project Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Location">
            <input className={inputClass} value={form.location} onChange={(e) => set("location", e.target.value)} />
          </Field>
          <Field label="Site Area">
            <input className={inputClass} value={form.siteArea} onChange={(e) => set("siteArea", e.target.value)} />
          </Field>
          <Field label="Project Area">
            <input
              className={inputClass}
              value={form.projectArea}
              onChange={(e) => set("projectArea", e.target.value)}
            />
          </Field>
          <Field label="Project Type">
            <input
              className={inputClass}
              value={form.projectType}
              onChange={(e) => set("projectType", e.target.value)}
            />
          </Field>
          <Field label="Project Language">
            <input
              className={inputClass}
              value={form.projectLanguage}
              onChange={(e) => set("projectLanguage", e.target.value)}
            />
          </Field>
          <Field label="Project Scope">
            <input
              className={inputClass}
              value={form.projectScope}
              onChange={(e) => set("projectScope", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-[11px] tracking-[0.2em] uppercase font-medium text-slate-500 mb-5">Images</h2>
        <div className="space-y-6">
          <ImageUploader
            label="Hero Image"
            hint="Used on the listing card and the detail page banner"
            images={form.heroImage ? [form.heroImage] : []}
            onChange={(imgs) => set("heroImage", imgs[0] ?? "")}
          />
          <ImageUploader
            label="Gallery Images"
            hint="Shown in the detail page gallery"
            multiple
            images={form.images}
            onChange={(imgs) => set("images", imgs)}
          />
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
            className="w-4 h-4 accent-[#A98C5F]"
          />
          <span className="text-sm text-[#1C2420]">Published — visible on the live site</span>
        </label>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[#00251f] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-6 py-3 hover:bg-[#00251f]/90 transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : mode === "create" ? "Create Project" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="text-sm text-slate-500 hover:text-[#1C2420] px-4 py-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
