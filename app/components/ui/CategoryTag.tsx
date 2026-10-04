"use client";

import { cn } from "@/app/lib/cn";

interface CategoryTagProps {
  category: string;
  className?: string;
}

const categoryColors: Record<string, { dot: string; label: string }> = {
  Infra: { dot: "#60a5fa", label: "#e4e4e7" },
  TI: { dot: "#60a5fa", label: "#e4e4e7" },
  Materiais: { dot: "#fbbf24", label: "#e4e4e7" },
  RH: { dot: "#d8b4fe", label: "#e4e4e7" },
  Financeiro: { dot: "#f9a8d4", label: "#e4e4e7" },
};

export function CategoryTag({ category, className }: CategoryTagProps) {
  const colors = categoryColors[category] || { dot: "#60a5fa", label: "#e4e4e7" };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/50 px-2.5 py-1",
        className
      )}
    >
      <span
        className="relative h-1.25 w-1.25 rounded-full"
        style={{ backgroundColor: colors.dot }}
      />
      <span
        className="text-[11.5px] font-semibold"
        style={{ color: colors.label }}
      >
        {category}
      </span>
    </span>
  );
}