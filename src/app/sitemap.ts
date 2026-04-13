import type { MetadataRoute } from "next";
import { sections } from "@/content/sections";
import { getAllPlaybooks } from "@/content/playbooks";

const BASE_URL = "https://api-playbooks.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/top-10`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/playbooks`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];

  const sectionPages: MetadataRoute.Sitemap = sections.map((s) => ({
    url: `${BASE_URL}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const topicPages: MetadataRoute.Sitemap = sections.flatMap((s) =>
    s.topics.map((t) => ({
      url: `${BASE_URL}/${s.slug}/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  const playbookPages: MetadataRoute.Sitemap = getAllPlaybooks().map((p) => ({
    url: `${BASE_URL}/playbooks/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...sectionPages, ...topicPages, ...playbookPages];
}
