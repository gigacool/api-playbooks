import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { Comparison } from "./comparison";
import { HighlightedCode } from "./highlighted-code";

export const mdxComponents = {
  Callout,
  CodeBlock,
  Comparison,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-bold tracking-tight mt-8 mb-4 first:mt-0"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-semibold tracking-tight mt-10 mb-4 pb-2 border-b border-border"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-semibold mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 mb-4 text-foreground/90" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-4 space-y-1.5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1.5" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement> & { className?: string; children?: React.ReactNode }) => {
    // Detect task list items (rendered by remark-gfm as <li> with <input type="checkbox">)
    const children = props.children;
    const isTaskItem = Array.isArray(children)
      ? children.some(
          (child) =>
            typeof child === "object" &&
            child !== null &&
            "type" in child &&
            (child as React.ReactElement).type === "input"
        )
      : typeof children === "object" &&
        children !== null &&
        "type" in children &&
        (children as React.ReactElement).type === "input";

    if (isTaskItem) {
      return (
        <li className="flex items-start gap-2 leading-7 text-foreground/90 list-none -ml-6" {...props} />
      );
    }

    return <li className="leading-7 text-foreground/90" {...props} />;
  },
  input: (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    if (props.type === "checkbox") {
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 mt-1 rounded border-2 border-border bg-card shrink-0">
          {props.checked && (
            <svg className="w-3 h-3 text-primary" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      );
    }
    return <input {...props} />;
  },
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-6"
      {...props}
    />
  ),
  pre: HighlightedCode,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted/50 border-b border-border" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border/50" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-muted/30 transition-colors" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="text-left font-semibold px-4 py-3" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
};
