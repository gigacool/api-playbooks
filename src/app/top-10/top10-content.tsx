"use client";

import Link from "next/link";
import { commandments, type Commandment } from "@/content/top10";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Slideshow } from "@/components/presentation/slideshow";

function CommandmentSlide({ c }: { c: Commandment }) {
  return (
    <div>
      {/* Number + Title */}
      <div className="flex items-start gap-4 mb-6">
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl shrink-0">
          {c.number}
        </span>
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
            {c.title}
          </h2>
          <p className="text-lg text-primary font-medium mt-2">
            {c.oneLiner}
          </p>
        </div>
      </div>

      {/* Why */}
      <p className="text-muted-foreground leading-relaxed mb-6 ml-16 text-base">
        {c.why}
      </p>

      {/* Do / Don't */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ml-16">
        <div className="rounded-lg border border-emerald-200 dark:border-emerald-900 p-5 bg-emerald-50/50 dark:bg-emerald-950/20">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2 uppercase tracking-wide">
            Do this
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {c.doThis}
          </p>
        </div>
        <div className="rounded-lg border border-red-200 dark:border-red-900 p-5 bg-red-50/50 dark:bg-red-950/20">
          <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-2 uppercase tracking-wide">
            Not this
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {c.notThis}
          </p>
        </div>
      </div>

      {/* Example */}
      {c.example && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ml-16">
          <div>
            <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1.5">
              Bad
            </p>
            <pre className="bg-[#24292e] text-[#e1e4e8] rounded-lg p-4 overflow-x-auto text-sm font-mono whitespace-pre-wrap">
              {c.example.bad}
            </pre>
          </div>
          <div>
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1.5">
              Good
            </p>
            <pre className="bg-[#24292e] text-[#e1e4e8] rounded-lg p-4 overflow-x-auto text-sm font-mono whitespace-pre-wrap">
              {c.example.good}
            </pre>
          </div>
        </div>
      )}

      {/* Deep dive links */}
      <div className="flex flex-wrap gap-2 ml-16">
        {c.deepDiveLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors border border-primary/20 hover:border-primary/40 rounded-md px-2.5 py-1.5"
          >
            {link.label}
            <ArrowRight className="w-3 h-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <Badge variant="secondary" className="mb-4 text-sm">
        API Playbooks
      </Badge>
      <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        The 10 API Commandments
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
        The fundamental principles that separate APIs people love from APIs
        people work around.
      </p>
      <p className="text-sm text-muted-foreground mt-8">
        Use arrow keys to navigate
      </p>
    </div>
  );
}

function ClosingSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
        Go deeper
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mb-8">
        Each commandment links to detailed topics with JSON examples, diagrams,
        checklists, and do/don&apos;t guidance. Bookmark the site and explore at
        your own pace.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Explore all topics
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/playbooks/rest-api-design"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-medium hover:bg-accent transition-colors"
        >
          REST Design Playbook
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
      <p className="mt-12 text-sm text-muted-foreground">
        Built by{" "}
        <a href="https://noosia.digital" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">Noosia Digital</a>
        {" "}&mdash; learning experiences that stick.
      </p>
    </div>
  );
}

export function Top10Content() {
  const slides: React.ReactNode[] = [
    <TitleSlide key="title" />,
    ...commandments.map((c) => <CommandmentSlide key={c.number} c={c} />),
    <ClosingSlide key="closing" />,
  ];

  const titles = [
    "The 10 API Commandments",
    ...commandments.map((c) => `${c.number}. ${c.title}`),
    "Go Deeper",
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
      {/* Header with Present button */}
      <div className="mb-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="secondary" className="mb-3">
              Presentation
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
              The 10 API Commandments
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The fundamental principles that separate APIs people love from
              APIs people work around. Each one links to deeper content for
              self-exploration.
            </p>
          </div>
          <div className="shrink-0 pt-2">
            <Slideshow titles={titles}>{slides}</Slideshow>
          </div>
        </div>
      </div>

      {/* Scrollable list (reference mode) */}
      <div className="space-y-8">
        {commandments.map((c) => (
          <section key={c.number} id={`cmd-${c.number}`} className="scroll-mt-20">
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

            <div className="ml-14">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {c.why}
              </p>

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
        <a href="https://noosia.digital" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">Noosia Digital</a>
        {" "}&mdash; learning experiences that stick.
      </div>
    </div>
  );
}
