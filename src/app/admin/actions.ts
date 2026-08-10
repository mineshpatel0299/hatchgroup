"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { eq, count } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import {
  checkPassword,
  setSessionCookie,
  clearSessionCookie,
  isAdminPasswordConfigured,
} from "@/lib/auth";

export interface ProjectInput {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  details: string;
  location: string;
  siteArea: string;
  projectArea: string;
  projectType: string;
  projectLanguage: string;
  projectScope: string;
  heroImage: string;
  images: string[];
  imageAlts: Record<string, string>;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  noIndex: boolean;
  published: boolean;
}

export interface LoginState {
  error?: string;
}

function revalidateProjects() {
  // { expire: 0 } forces an immediate (blocking) revalidation on next read —
  // the admin panel needs to see its own writes right away, unlike the
  // "max" profile's stale-while-revalidate semantics.
  revalidateTag("projects", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/project");
  revalidatePath("/project/[id]", "page");
  revalidatePath("/about");
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") || "");

  if (!isAdminPasswordConfigured()) {
    return { error: "ADMIN_PASSWORD isn't set on the server yet — add it to your environment variables." };
  }
  if (!password || !checkPassword(password)) {
    return { error: "Incorrect password." };
  }

  await setSessionCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function createProject(input: ProjectInput): Promise<{ error?: string }> {
  const db = getDb();
  if (!db) return { error: "Database not configured yet. Add DATABASE_URL to your environment variables." };

  try {
    const [{ value: total }] = await db.select({ value: count() }).from(projects);
    await db.insert(projects).values({ ...input, sortOrder: total });
  } catch (err) {
    console.error("[admin] createProject failed:", err);
    const message = err instanceof Error ? err.message : "";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { error: `Slug "${input.slug}" is already in use by another project.` };
    }
    return { error: "Failed to create project." };
  }

  revalidateProjects();
  redirect("/admin/projects");
}

export async function updateProject(id: number, input: ProjectInput): Promise<{ error?: string }> {
  const db = getDb();
  if (!db) return { error: "Database not configured yet. Add DATABASE_URL to your environment variables." };

  try {
    await db
      .update(projects)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(projects.id, id));
  } catch (err) {
    console.error("[admin] updateProject failed:", err);
    const message = err instanceof Error ? err.message : "";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { error: `Slug "${input.slug}" is already in use by another project.` };
    }
    return { error: "Failed to update project." };
  }

  revalidateProjects();
  redirect("/admin/projects");
}

export async function deleteProject(id: number): Promise<{ error?: string }> {
  const db = getDb();
  if (!db) return { error: "Database not configured yet." };

  await db.delete(projects).where(eq(projects.id, id));
  revalidateProjects();
  return {};
}

export async function togglePublished(id: number, published: boolean): Promise<{ error?: string }> {
  const db = getDb();
  if (!db) return { error: "Database not configured yet." };

  await db.update(projects).set({ published, updatedAt: new Date() }).where(eq(projects.id, id));
  revalidateProjects();
  return {};
}

export async function reorderProjects(orderedIds: number[]): Promise<{ error?: string }> {
  const db = getDb();
  if (!db) return { error: "Database not configured yet." };

  await Promise.all(
    orderedIds.map((id, index) => db.update(projects).set({ sortOrder: index }).where(eq(projects.id, id)))
  );
  revalidateProjects();
  return {};
}
