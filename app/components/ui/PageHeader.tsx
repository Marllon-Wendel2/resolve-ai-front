"use client";

import { type ReactNode } from "react";
import { cn } from "@/app/lib/cn";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  alignItems?: "center" | "end";
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  alignItems = "center",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex justify-between gap-4",
        alignItems === "end" ? "items-end" : "items-center",
        className
      )}
    >
      <div className="flex flex-col gap-1 min-w-0">
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold text-primary truncate">{title}</h1>
        {description && (
          <p className="text-sm text-secondary truncate">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </header>
  );
}