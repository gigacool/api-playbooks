import type { Playbook, PlaybookStep } from "@/content/playbooks/types";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const difficultyColors: Record<string, string> = {
  beginner:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  intermediate:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  advanced:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  expert: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
};

function StepCard({ step, index }: { step: PlaybookStep; index: number }) {
  return (
    <section id={step.id} className="border border-border rounded-xl p-6 bg-card scroll-mt-20">
      <h3 className="text-lg font-semibold text-foreground mb-3">
        {index + 1}. {step.title}
      </h3>

      <div className="space-y-4 text-sm text-muted-foreground">
        <div>
          <p className="font-medium text-foreground mb-1">What</p>
          <p className="leading-relaxed">{step.what}</p>
        </div>

        <div>
          <p className="font-medium text-foreground mb-1">Why it matters</p>
          <p className="leading-relaxed">{step.whyItMatters}</p>
        </div>

        {step.commonGaps && (
          <div>
            <p className="font-medium text-foreground mb-1">Common gaps</p>
            <p className="leading-relaxed">{step.commonGaps}</p>
          </div>
        )}

        {step.guidance.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-emerald-600 dark:text-emerald-400">
                    Do this
                  </th>
                  <th className="text-left p-3 font-medium text-red-600 dark:text-red-400">
                    Not this
                  </th>
                  <th className="text-left p-3 font-medium text-muted-foreground">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody>
                {step.guidance.map((g, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="p-3 align-top leading-relaxed">{g.do}</td>
                    <td className="p-3 align-top leading-relaxed">{g.dont}</td>
                    <td className="p-3 align-top text-muted-foreground leading-relaxed">
                      {g.why}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export function PlaybookView({ playbook }: { playbook: Playbook }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
      {/* Header */}
      <header className="mb-8">
        <Badge variant="secondary" className="mb-3">
          Playbook
        </Badge>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {playbook.title}
        </h1>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {playbook.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="secondary"
            className={cn(
              "text-xs",
              difficultyColors[playbook.difficulty] || difficultyColors.beginner
            )}
          >
            {playbook.difficulty}
          </Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {playbook.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Target className="w-4 h-4" />
            {playbook.targetAudience}
          </span>
        </div>
      </header>

      {/* Overview */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-3">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          {playbook.overview}
        </p>
      </section>

      {/* When to use / When not to use */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {playbook.whenToUse.length > 0 && (
          <section className="border border-border rounded-xl p-5 bg-card">
            <h3 className="font-semibold text-foreground mb-3 text-emerald-600 dark:text-emerald-400">
              When to use
            </h3>
            <ul className="space-y-2">
              {playbook.whenToUse.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {playbook.whenNotToUse.length > 0 && (
          <section className="border border-border rounded-xl p-5 bg-card">
            <h3 className="font-semibold text-foreground mb-3 text-red-600 dark:text-red-400">
              When NOT to use
            </h3>
            <ul className="space-y-2">
              {playbook.whenNotToUse.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-red-500 mt-0.5 shrink-0">-</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Checklist */}
      {playbook.checklist.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-primary" />
            Practice Checklist
          </h2>
          <div className="border border-border rounded-xl p-5 bg-card space-y-3">
            {playbook.checklist.map((item, i) => {
              const stepId =
                playbook.steps[i]?.id;
              const content = (
                <div className="flex gap-3 group">
                  <Square className="w-5 h-5 mt-0.5 shrink-0 text-border group-hover:text-primary transition-colors" />
                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium text-foreground",
                        stepId &&
                          "group-hover:text-primary transition-colors"
                      )}
                    >
                      {item.step}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );

              if (stepId) {
                return (
                  <Link
                    key={i}
                    href={`#${stepId}`}
                    className="block rounded-lg -mx-2 px-2 py-1 hover:bg-accent/50 transition-colors"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div key={i} className="py-1">
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Steps */}
      {playbook.steps.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Practice Guidance
          </h2>
          <div className="space-y-6">
            {playbook.steps.map((step, i) => (
              <StepCard key={step.id} step={step} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
