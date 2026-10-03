"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { StatusBadge } from "./StatusBadge";

interface ActivityRowProps {
  title: string;
  meta: string;
  categoryIcon: LucideIcon;
  categoryBgColor: string;
  iconColor: string;
  status: "Aberto" | "Em Atendimento" | "Concluído";
  statusDotColor: string;
  statusLabelColor: string;
  isLast?: boolean;
  className?: string;
}

export function ActivityRow({
  title,
  meta,
  categoryIcon: Icon,
  categoryBgColor,
  iconColor,
  status,
  statusDotColor,
  statusLabelColor,
  isLast = false,
  className,
}: ActivityRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-[14px]",
        "border-b border-zinc-800",
        !isLast && "pb-[13px]",
        isLast && "pb-0",
        "pt-[13px]",
        className
      )}
    >
      <div
        className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px]"
        style={{ backgroundColor: categoryBgColor }}
      >
        <Icon className="h-[16px] w-[16px]" style={{ color: iconColor }} />
      </div>

      <div className="flex flex-col gap-[4px] min-w-0 flex-1">
        <p className="text-[13.5px] font-semibold text-primary truncate">{title}</p>
        <p className="text-[11.5px] text-muted truncate">{meta}</p>
      </div>

      <StatusBadge
        status={status}
        dotColor={statusDotColor}
        labelColor={statusLabelColor}
      />
    </div>
  );
}