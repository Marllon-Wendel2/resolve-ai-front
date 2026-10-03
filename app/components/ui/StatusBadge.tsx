"use client";

import { type SolicitationStatus } from "@/app/types";
import { cn } from "@/app/lib/cn";

interface StatusBadgeProps {
  status: SolicitationStatus;
  dotColor: string;
  labelColor: string;
  className?: string;
}

export function StatusBadge({ status, dotColor, labelColor, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[6px] rounded-full px-3 py-1 shrink-0",
        "bg-white/5 border border-white/10",
        className
      )}
    >
      <span
        className="relative h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: dotColor }}
      />
      <span
        className="text-[11.5px] font-semibold"
        style={{ color: labelColor }}
      >
        {status}
      </span>
    </span>
  );
}