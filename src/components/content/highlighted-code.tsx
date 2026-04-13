import { codeToHtml } from "shiki";
import { MermaidDiagram } from "./mermaid";

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

function extractCodeInfo(children: React.ReactNode): {
  code: string;
  language: string;
} {
  if (!children || typeof children !== "object") {
    return { code: String(children || ""), language: "text" };
  }

  const child = children as React.ReactElement<{
    className?: string;
    children?: React.ReactNode;
  }>;

  if (child?.props) {
    const className = child.props.className || "";
    const match = className.match(/language-(\w+)/);
    const language = match ? match[1] : "text";
    const code = String(child.props.children || "").replace(/\n$/, "");
    return { code, language };
  }

  return { code: String(children), language: "text" };
}

const languageMap: Record<string, string> = {
  protobuf: "proto",
  proto3: "proto",
};

export async function HighlightedCode(props: PreProps) {
  const { children, ...rest } = props;
  const { code, language: rawLang } = extractCodeInfo(children);

  // Intercept mermaid code blocks and render as diagrams
  if (rawLang === "mermaid") {
    return <MermaidDiagram chart={code} />;
  }

  const language = languageMap[rawLang] || rawLang;

  let html: string;
  try {
    html = await codeToHtml(code, {
      lang: language,
      theme: "github-dark",
    });
  } catch {
    // Fallback for unsupported languages
    try {
      html = await codeToHtml(code, {
        lang: "text",
        theme: "github-dark",
      });
    } catch {
      return (
        <pre className="bg-[#24292e] text-[#e1e4e8] rounded-lg p-4 overflow-x-auto my-6 text-sm font-mono" {...rest}>
          <code>{code}</code>
        </pre>
      );
    }
  }

  return (
    <div
      className="rounded-lg overflow-hidden my-6 text-sm [&>pre]:!p-4 [&>pre]:!overflow-x-auto [&>pre]:!rounded-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
