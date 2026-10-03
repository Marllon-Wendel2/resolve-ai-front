"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/cn";

export interface KPICardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  delta?: string;
  deltaColor?: string;
  caption?: string;
}

export function KPICard({
  label,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
  delta,
  deltaColor = "#4ade80",
  caption,
}: KPICardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-surface p-[18px_20px]",
        "flex flex-col gap-3.5"
      )}
    >
      <div className="flex justify-between items-center">
        <p className="text-[10.5px] font-bold tracking-widest text-white">
          {label}
        </p>
        <div
          className="flex h-8.5 w-8.5 items-center justify-center rounded-[10px] shrink-0"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon className="h-4.25 w-4.25" style={{ color: iconColor }} />
        </div>
      </div>

      <p className="text-[34px] font-bold tracking-[-0.02em] text-white">
        {value}
      </p>

      {(delta || caption) && (
        <div className="flex items-center gap-1.5">
          {delta && (
            <span
              className="text-[11.5px] font-bold"
              style={{ color: deltaColor }}
            >
              {delta}
            </span>
          )}
          {caption && (
            <span className="text-[11.5px] text-muted">{caption}</span>
          )}
        </div>
      )}
    </div>
  );
}