"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  section: { slug: string; title: string };
  topic: { slug: string; title: string };
}

interface TopicNavProps {
  prev: NavItem | null;
  next: NavItem | null;
}

export function TopicNav({ prev, next }: TopicNavProps) {
  return (
    <div className="flex items-stretch gap-4 mt-12 pt-8 border-t border-border">
      {prev ? (
        <Link
          href={`/${prev.section.slug}/${prev.topic.slug}`}
          className="flex-1 group"
        >
          <Button
            variant="outline"
            className="w-full h-auto py-4 px-4 flex flex-col items-start gap-1"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ChevronLeft className="w-3 h-3" />
              Previous
            </span>
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {prev.topic.title}
            </span>
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/${next.section.slug}/${next.topic.slug}`}
          className="flex-1 group"
        >
          <Button
            variant="outline"
            className="w-full h-auto py-4 px-4 flex flex-col items-end gap-1"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Next
              <ChevronRight className="w-3 h-3" />
            </span>
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {next.topic.title}
            </span>
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
