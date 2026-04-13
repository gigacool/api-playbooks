import Link from "next/link";
import { notFound } from "next/navigation";
import { sections, getSection } from "@/content/sections";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";

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
  return sections.map((s) => ({ section: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  return params.then(({ section: slug }) => {
    const section = getSection(slug);
    if (!section) return {};
    return {
      title: `${section.title} — API Playbook`,
      description: section.subtitle,
    };
  });
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: slug } = await params;
  const section = getSection(slug);
  if (!section) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">
          Section {section.number} &middot; {section.topics.length} topics
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
          {section.title}
        </h1>
        <p className="text-lg text-muted-foreground">{section.subtitle}</p>
      </div>

      <div className="space-y-3">
        {section.topics.map((topic, i) => (
          <Link key={topic.slug} href={`/${section.slug}/${topic.slug}`}>
            <Card className="hover:border-primary/50 transition-colors group">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-muted-foreground/40 tabular-nums w-8 shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base group-hover:text-primary transition-colors flex items-center gap-2">
                      {topic.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {topic.hook}
                    </CardDescription>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${difficultyColor[topic.difficulty]}`}
                      >
                        {difficultyLabel[topic.difficulty]}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {topic.readMinutes} min read
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
