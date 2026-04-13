"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightedHtml?: string;
}

export function CodeBlock({
  code,
  language = "text",
  filename,
  highlightedHtml,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative group rounded-lg border border-border bg-muted/50 my-6 overflow-hidden">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/80 text-xs text-muted-foreground">
          <span className="font-mono">{filename || language}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copy
              </>
            )}
          </button>
        </div>
      )}
      {highlightedHtml ? (
        <div
          className="p-4 overflow-x-auto text-sm [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="p-4 overflow-x-auto text-sm">
          <code className={cn("language-" + language)}>{code}</code>
        </pre>
      )}
    </div>
  );
}
