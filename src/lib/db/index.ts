import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

let cached: NeonHttpDatabase<typeof schema> | null | undefined;

/** Returns null (instead of throwing) when DATABASE_URL isn't configured yet,
 *  so callers can fall back to static seed data at build/dev time. */
export function getDb(): NeonHttpDatabase<typeof schema> | null {
  if (cached !== undefined) return cached;

  const url = process.env.DATABASE_URL;
  if (!url) {
    cached = null;
    return cached;
  }

  cached = drizzle(neon(url), { schema });
  return cached;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
