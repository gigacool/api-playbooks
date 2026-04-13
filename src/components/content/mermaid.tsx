"use client";

import { useEffect, useRef, useState, useId } from "react";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const uniqueId = useId().replace(/:/g, "-");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const cleanChart = (chart || "").trim();

      if (!cleanChart) {
        if (!cancelled) setError("Empty chart definition");
        return;
      }

      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: "basis",
          },
          sequence: {
            useMaxWidth: true,
            actorMargin: 50,
            messageFontSize: 13,
          },
          securityLevel: "loose",
        });

        const id = `mermaid${uniqueId}${Math.random().toString(36).slice(2, 6)}`;
        const { svg: rendered } = await mermaid.render(id, cleanChart);
        if (!cancelled) {
          setSvg(rendered);
        }
      } catch (e) {
        if (!cancelled) {
          console.error("Mermaid render error:", e);
          setError(String(e));
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, uniqueId]);

  if (error) {
    return (
      <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50 dark:bg-amber-950 p-4 my-6 text-sm text-amber-800 dark:text-amber-200">
        <p className="font-medium mb-2">Diagram render error</p>
        <pre className="text-xs overflow-x-auto whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-8 my-6 text-center text-sm text-muted-foreground animate-pulse">
        Loading diagram...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="rounded-lg border border-border bg-white dark:bg-muted/20 p-4 my-6 overflow-x-auto [&>svg]:mx-auto [&>svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
