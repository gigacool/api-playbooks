"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Play, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideshowProps {
  children: React.ReactNode[];
  titles?: string[];
}

export function Slideshow({ children, titles }: SlideshowProps) {
  const [isActive, setIsActive] = useState(false);
  const [current, setCurrent] = useState(0);
  const total = children.length;

  const next = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, total - 1));
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  const exit = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    function handleKey(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "Escape":
          e.preventDefault();
          exit();
          break;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isActive, next, prev, exit]);

  // Lock body scroll when active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  if (!isActive) {
    return (
      <button
        onClick={() => {
          setCurrent(0);
          setIsActive(true);
        }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
      >
        <Play className="w-4 h-4" />
        Present
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            {current + 1} / {total}
          </span>
          {titles && titles[current] && (
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              {titles[current]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Arrow keys to navigate, ESC to exit
          </span>
          <button
            onClick={exit}
            className="p-2 rounded-md hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Slide content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 lg:py-12 min-h-full flex flex-col justify-center">
          {children[current]}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-card/80 backdrop-blur-sm">
        <button
          onClick={prev}
          disabled={current === 0}
          className={cn(
            "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            current === 0
              ? "text-muted-foreground/40 cursor-not-allowed"
              : "text-foreground hover:bg-accent"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "rounded-full transition-all duration-200",
                i === current
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === total - 1}
          className={cn(
            "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            current === total - 1
              ? "text-muted-foreground/40 cursor-not-allowed"
              : "text-foreground hover:bg-accent"
          )}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
