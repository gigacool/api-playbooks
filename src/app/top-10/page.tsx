import Link from "next/link";
import { commandments } from "@/content/top10";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata = {
  title: "10 API Commandments — API Playbooks",
  description:
    "The 10 fundamental principles every API team should follow. Synthetic, opinionated, actionable.",
};

export default function Top10Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-12">
        <Badge variant="secondary" className="mb-3">
          Presentation
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
          The 10 API Commandments
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The fundamental principles that separate APIs people love from APIs
          people work around. Each one links to deeper content for
          self-exploration.
        </p>
      </div>

      {/* Commandments */}
      <div className="space-y-8">
        {commandments.map((c) => (
          <section
            key={c.number}
            id={`cmd-${c.number}`}
            className="scroll-mt-20"
          >
            {/* Number + Title */}
            <div className="flex items-start gap-4 mb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0">
                {c.number}
              </span>
              <div>
                <h2 className="text-xl font-bold text-foreground leading-tight">
                  {c.title}
                </h2>
                <p className="text-base text-primary font-medium mt-1">
                  {c.oneLiner}
                </p>
              </div>
            </div>

            {/* Why */}
            <div className="ml-14">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {c.why}
              </p>

              {/* Do / Don't */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="rounded-lg border border-emerald-200 dark:border-emerald-900 p-4 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5 uppercase tracking-wide">
                    Do this
                  </p>
                  <p className="text-sm text-foreground/90">{c.doThis}</p>
                </div>
                <div className="rounded-lg border border-red-200 dark:border-red-900 p-4 bg-red-50/50 dark:bg-red-950/20">
                  <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1.5 uppercase tracking-wide">
                    Not this
                  </p>
                  <p className="text-sm text-foreground/90">{c.notThis}</p>
                </div>
              </div>

              {/* Example */}
              {c.example && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1.5">
                      Bad
                    </p>
                    <pre className="bg-[#24292e] text-[#e1e4e8] rounded-lg p-3 overflow-x-auto text-xs font-mono whitespace-pre-wrap">
                      {c.example.bad}
                    </pre>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1.5">
                      Good
                    </p>
                    <pre className="bg-[#24292e] text-[#e1e4e8] rounded-lg p-3 overflow-x-auto text-xs font-mono whitespace-pre-wrap">
                      {c.example.good}
                    </pre>
                  </div>
                </div>
              )}

              {/* Deep dive links */}
              <div className="flex flex-wrap gap-2">
                {c.deepDiveLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors border border-primary/20 hover:border-primary/40 rounded-md px-2.5 py-1"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 rounded-xl border border-border bg-card p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Go deeper</h2>
        <p className="text-muted-foreground mb-4">
          Each commandment links to detailed topics with JSON examples,
          diagrams, checklists, and do/don&apos;t guidance.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Explore all topics
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/playbooks/rest-api-design"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border font-medium text-sm hover:bg-accent transition-colors"
          >
            REST Design Playbook
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Built by{" "}
        <span className="font-medium text-foreground">Noosia Digital</span>
        {" "}&mdash; learning experiences that stick.
      </div>
    </div>
  );
}
