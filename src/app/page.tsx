import Link from "next/link";
import { sections } from "@/content/sections";
import { getAllPlaybooks } from "@/content/playbooks";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Blocks,
  Compass,
  Shield,
  Network,
  Lock,
  Activity,
  Repeat,
  Bot,
  BookOpen,
  ArrowRight,
  Clock,
  Target,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Blocks,
  Compass,
  Shield,
  Network,
  Lock,
  Activity,
  Repeat,
  Bot,
};

export default function Home() {
  const totalTopics = sections.reduce((acc, s) => acc + s.topics.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
      <div className="mb-16">
        <Badge variant="secondary" className="mb-4">
          {sections.length} sections &middot; {totalTopics} topics
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          The API Playbooks
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          What they don&apos;t teach you about building APIs that last.
          An interactive reference for engineers who want to go beyond the surface.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <Link
            href="/top-10"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Get started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/${sections[0].slug}/${sections[0].topics[0].slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border font-medium text-sm hover:bg-accent transition-colors"
          >
            Browse topics
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => {
          const Icon = iconMap[section.icon] || Blocks;
          return (
            <Link key={section.slug} href={`/${section.slug}`}>
              <Card className="h-full hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {section.number}. {section.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {section.subtitle}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {section.topics.map((topic) => (
                      <Badge
                        key={topic.slug}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {topic.title}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Playbooks */}
      {getAllPlaybooks().length > 0 && (
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Playbooks</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Step-by-step practice guides with do/don&apos;t guidance.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {getAllPlaybooks().map((pb) => (
              <Link key={pb.slug} href={`/playbooks/${pb.slug}`}>
                <Card className="hover:border-primary/50 transition-colors group">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <BookOpen className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors flex items-center gap-2">
                          {pb.title}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {pb.description}
                        </CardDescription>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {pb.estimatedMinutes} min
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Target className="w-3 h-3" />
                            {pb.targetAudience}
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
      )}

      <div className="mt-16 text-center text-sm text-muted-foreground">
        Built by{" "}
        <a href="https://noosia.digital" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">Noosia Digital</a>
        {" "}&mdash; learning experiences that stick.
      </div>
    </div>
  );
}
