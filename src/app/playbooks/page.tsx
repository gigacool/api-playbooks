import Link from "next/link";
import { getAllPlaybooks } from "@/content/playbooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  intermediate:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  advanced:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  expert: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
};

export const metadata = {
  title: "Playbooks — API Playbook",
  description:
    "Step-by-step practice guides for API design, security, and operations.",
};

export default function PlaybooksIndex() {
  const playbooks = getAllPlaybooks();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">
          {playbooks.length} {playbooks.length === 1 ? "playbook" : "playbooks"}
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
          Playbooks
        </h1>
        <p className="text-lg text-muted-foreground">
          Step-by-step practice guides with do/don&apos;t guidance. Follow these
          when you&apos;re building, not just reading.
        </p>
      </div>

      <div className="space-y-3">
        {playbooks.map((playbook) => (
          <Link key={playbook.slug} href={`/playbooks/${playbook.slug}`}>
            <Card className="hover:border-primary/50 transition-colors group">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <BookOpen className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base group-hover:text-primary transition-colors flex items-center gap-2">
                      {playbook.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {playbook.description}
                    </CardDescription>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-[10px]",
                          difficultyColors[playbook.difficulty]
                        )}
                      >
                        {playbook.difficulty}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {playbook.estimatedMinutes} min
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Target className="w-3 h-3" />
                        {playbook.targetAudience}
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
