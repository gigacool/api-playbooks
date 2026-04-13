"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/content/sections";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Blocks,
  Compass,
  Shield,
  Network,
  Lock,
  Activity,
  Repeat,
  Bot,
  Menu,
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

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center gap-2 p-3 border-b border-border bg-card">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="shrink-0" />
          }
        >
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="p-4 border-b border-border">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  AP
                </span>
              </div>
              <div>
                <h1 className="font-semibold text-sm">API Playbook</h1>
                <p className="text-xs text-muted-foreground">
                  What they don&apos;t teach you
                </p>
              </div>
            </Link>
          </div>
          <ScrollArea className="flex-1 h-[calc(100vh-80px)]">
            <nav className="p-2">
              {sections.map((section) => {
                const Icon = iconMap[section.icon] || Blocks;
                return (
                  <div key={section.slug} className="mb-3">
                    <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground">
                      <Icon className="w-4 h-4" />
                      {section.number}. {section.title}
                    </div>
                    <div className="ml-4 space-y-0.5">
                      {section.topics.map((topic) => {
                        const topicPath = `/${section.slug}/${topic.slug}`;
                        const isActive = pathname === topicPath;
                        return (
                          <Link
                            key={topic.slug}
                            href={topicPath}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "block px-3 py-1.5 rounded-md text-sm transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-accent"
                            )}
                          >
                            {topic.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <Link href="/" className="font-semibold text-sm">
        API Playbook
      </Link>
      {pathname !== "/" && (
        <Badge variant="secondary" className="ml-auto text-xs">
          {sections.find((s) => pathname.startsWith(`/${s.slug}`))?.title}
        </Badge>
      )}
    </div>
  );
}
