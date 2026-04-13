import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";

interface ComparisonProps {
  bad: {
    title?: string;
    children: React.ReactNode;
  };
  good: {
    title?: string;
    children: React.ReactNode;
  };
}

export function Comparison({ bad, good }: ComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div className="rounded-lg border border-red-200 dark:border-red-900 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-900">
          <X className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="text-sm font-medium text-red-800 dark:text-red-200">
            {bad.title || "Don't do this"}
          </span>
        </div>
        <div className="p-4 text-sm">{bad.children}</div>
      </div>
      <div className="rounded-lg border border-emerald-200 dark:border-emerald-900 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950 border-b border-emerald-200 dark:border-emerald-900">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            {good.title || "Do this instead"}
          </span>
        </div>
        <div className="p-4 text-sm">{good.children}</div>
      </div>
    </div>
  );
}
