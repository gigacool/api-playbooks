"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/content/sections";
import { getAllPlaybooks } from "@/content/playbooks";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  Flame,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

export function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => {
      const active = sections.find((s) => pathname.startsWith(`/${s.slug}`));
      return new Set(active ? [active.slug] : [sections[0].slug]);
    }
  );

  function toggleSection(slug: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-border bg-card">
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              AP
            </span>
          </div>
          <div>
            <h1 className="font-semibold text-sm leading-tight">
              API Playbook
            </h1>
            <p className="text-xs text-muted-foreground">
              What they don&apos;t teach you
            </p>
          </div>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2">
          {/* Top 10 Commandments */}
          <Link
            href="/top-10"
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors mb-2",
              pathname === "/top-10"
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Flame className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">10 API Commandments</span>
          </Link>
          <Separator className="mb-2" />
          {sections.map((section) => {
            const Icon = iconMap[section.icon] || Blocks;
            const isExpanded = expandedSections.has(section.slug);
            const isSectionActive = pathname.startsWith(`/${section.slug}`);

            return (
              <div key={section.slug} className="mb-1">
                <button
                  onClick={() => toggleSection(section.slug)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isSectionActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left truncate">
                    {section.number}. {section.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 shrink-0 transition-transform",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {section.topics.map((topic) => {
                      const topicPath = `/${section.slug}/${topic.slug}`;
                      const isActive = pathname === topicPath;

                      return (
                        <Link
                          key={topic.slug}
                          href={topicPath}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <span className="flex-1 truncate">{topic.title}</span>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] px-1.5 py-0 shrink-0",
                              difficultyColor[topic.difficulty]
                            )}
                          >
                            {difficultyLabel[topic.difficulty]}
                          </Badge>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {/* Playbooks section */}
          <Separator className="my-2" />
          <div className="mb-1">
            <Link
              href="/playbooks"
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname.startsWith("/playbooks")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left">Playbooks</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {getAllPlaybooks().length}
              </Badge>
            </Link>
            {pathname.startsWith("/playbooks") && (
              <div className="ml-4 mt-1 space-y-0.5">
                {getAllPlaybooks().map((pb) => {
                  const pbPath = `/playbooks/${pb.slug}`;
                  const isActive = pathname === pbPath;
                  return (
                    <Link
                      key={pb.slug}
                      href={pbPath}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <span className="flex-1 truncate">{pb.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Built by{" "}
          <span className="font-medium text-foreground">Noosia Digital</span>
        </p>
      </div>
    </aside>
  );
}
