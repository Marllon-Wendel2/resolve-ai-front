"use client";

import { cn } from "@/app/lib/cn";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "h-[22px] w-[22px] text-[8.5px]",
  md: "h-[26px] w-[26px] text-[9.5px]",
  lg: "h-[32px] w-[32px] text-[11px]",
};

export function Avatar({ initials, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-zinc-700",
        "font-ui font-bold",
        sizeStyles[size],
        className
      )}
      style={{ color: "#e4e4e7" }}
    >
      {initials}
    </div>
  );
}