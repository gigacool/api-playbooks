import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Lightbulb, Flame } from "lucide-react";

const variants = {
  info: {
    icon: Info,
    className: "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950",
    iconClassName: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950",
    iconClassName: "text-amber-600 dark:text-amber-400",
  },
  tip: {
    icon: Lightbulb,
    className: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950",
    iconClassName: "text-emerald-600 dark:text-emerald-400",
  },
  aha: {
    icon: Flame,
    className: "border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950",
    iconClassName: "text-purple-600 dark:text-purple-400",
  },
};

interface CalloutProps {
  type: keyof typeof variants;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <div className={cn("rounded-lg border p-4 my-6", variant.className)}>
      <div className="flex gap-3">
        <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", variant.iconClassName)} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-sm mb-1">{title}</p>
          )}
          <div className="text-sm [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
