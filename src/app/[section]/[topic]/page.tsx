import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { sections, getTopic, getAdjacentTopics } from "@/content/sections";
import { getTopicContent } from "@/lib/mdx";
import { mdxComponents } from "@/components/content/mdx-components";
import { TopicNav } from "@/components/layout/topic-nav";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const difficultyLabel = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
} as const;

const difficultyColor = {
  1: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  2: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  3: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
} as const;

export function generateStaticParams() {
  return sections.flatMap((section) =>
    section.topics.map((topic) => ({
      section: section.slug,
      topic: topic.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; topic: string }>;
}) {
  const { section, topic } = await params;
  const result = getTopic(section, topic);
  if (!result) return {};
  return {
    title: `${result.topic.title} — API Playbook`,
    description: result.topic.hook,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ section: string; topic: string }>;
}) {
  const { section: sectionSlug, topic: topicSlug } = await params;
  const result = getTopic(sectionSlug, topicSlug);
  if (!result) notFound();

  const { section, topic } = result;
  const adjacent = getAdjacentTopics(sectionSlug, topicSlug);
  const content = getTopicContent(sectionSlug, topicSlug);

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {section.title}
          </Badge>
          <Badge
            variant="secondary"
            className={`text-xs ${difficultyColor[topic.difficulty]}`}
          >
            {difficultyLabel[topic.difficulty]}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {topic.readMinutes} min
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
          {topic.title}
        </h1>
        <p className="text-lg text-muted-foreground">{topic.hook}</p>
      </div>

      {content ? (
        <div className="prose-custom">
          <MDXRemote
            source={content.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground mb-2">
            Content coming soon.
          </p>
          <p className="text-sm text-muted-foreground">
            This topic is part of the playbook outline. Full content is being written.
          </p>
        </div>
      )}

      <TopicNav prev={adjacent.prev} next={adjacent.next} />
    </article>
  );
}
