import type { MetadataRoute } from "next";
import { generateSitemapEntries } from "@/lib/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await generateSitemapEntries();
  return entries.map((entry) => ({ url: entry.url, lastModified: entry.lastModified }));
}
