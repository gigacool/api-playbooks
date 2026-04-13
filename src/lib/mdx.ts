import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content/topics");

export interface TopicContent {
  slug: string;
  frontmatter: {
    title: string;
    section: string;
    difficulty: number;
    readMinutes: number;
    hook: string;
    takeaway: string;
    [key: string]: unknown;
  };
  content: string;
}

export function getTopicContent(
  sectionSlug: string,
  topicSlug: string
): TopicContent | null {
  const filePath = path.join(contentDir, sectionSlug, `${topicSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug: topicSlug,
    frontmatter: data as TopicContent["frontmatter"],
    content,
  };
}

export function getAllTopicFiles(): Array<{
  section: string;
  topic: string;
}> {
  const result: Array<{ section: string; topic: string }> = [];

  if (!fs.existsSync(contentDir)) return result;

  const sectionDirs = fs.readdirSync(contentDir);
  for (const sectionDir of sectionDirs) {
    const sectionPath = path.join(contentDir, sectionDir);
    if (!fs.statSync(sectionPath).isDirectory()) continue;

    const files = fs.readdirSync(sectionPath);
    for (const file of files) {
      if (file.endsWith(".mdx")) {
        result.push({
          section: sectionDir,
          topic: file.replace(".mdx", ""),
        });
      }
    }
  }

  return result;
}
