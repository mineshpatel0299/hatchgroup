import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { projects, type NewProjectRow } from "../src/lib/db/schema";
import { PROJECTS } from "../src/data/projects";
import { PROJECT_DETAILS } from "../src/data/project-details";

function slugFromHref(href: string): string {
  const match = href.match(/(\d+)\s*$/);
  return match ? match[1] : href;
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set. Add it to .env.local (or your shell env) and re-run.");
    process.exit(1);
  }

  const db = drizzle(neon(url));

  const rows: NewProjectRow[] = PROJECTS.map((p, index) => {
    const slug = slugFromHref(p.href);
    const detail = PROJECT_DETAILS[slug];
    return {
      slug,
      title: p.title,
      category: p.category,
      year: p.year,
      description: p.description,
      details: detail?.details ?? p.description,
      location: detail?.location ?? "",
      siteArea: detail?.siteArea ?? "",
      projectArea: detail?.projectArea ?? "",
      projectType: detail?.projectType ?? p.category,
      projectLanguage: detail?.projectLanguage ?? "",
      projectScope: detail?.projectScope ?? "",
      heroImage: detail?.image2 ?? p.image,
      images: detail?.images?.length ? detail.images : [p.image],
      sortOrder: index,
      published: true,
    };
  });

  console.log(`Seeding ${rows.length} projects...`);

  for (const row of rows) {
    await db
      .insert(projects)
      .values(row)
      .onConflictDoUpdate({
        target: projects.slug,
        set: { ...row, updatedAt: new Date() },
      });
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
