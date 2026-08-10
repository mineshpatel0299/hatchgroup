import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  year: text("year").notNull(),
  description: text("description").notNull(),
  details: text("details").notNull().default(""),
  location: text("location").notNull().default(""),
  siteArea: text("site_area").notNull().default(""),
  projectArea: text("project_area").notNull().default(""),
  projectType: text("project_type").notNull().default(""),
  projectLanguage: text("project_language").notNull().default(""),
  projectScope: text("project_scope").notNull().default(""),
  heroImage: text("hero_image").notNull(),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  imageAlts: jsonb("image_alts").$type<Record<string, string>>().notNull().default({}),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  ogImage: text("og_image").notNull().default(""),
  noIndex: boolean("no_index").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type ProjectRow = typeof projects.$inferSelect;
export type NewProjectRow = typeof projects.$inferInsert;
