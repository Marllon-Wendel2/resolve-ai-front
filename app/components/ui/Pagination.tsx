"use client";

import { cn } from "@/app/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className={cn("flex items-center gap-1.5", className)} aria-label="Paginação">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "h-7.5 w-7.5 flex items-center justify-center rounded-lg border border-zinc-700",
          "text-secondary transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-zinc-800 hover:border-zinc-600"
        )}
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="text-secondary px-1">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "h-7.5 w-7.5 flex items-center justify-center rounded-lg",
              "text-[12.5px] font-medium transition-colors",
              page === currentPage
                ? "bg-accent-tint text-accent"
                : "border border-zinc-700 text-secondary hover:bg-zinc-800 hover:border-zinc-600"
            )}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "h-7.5 w-7.5 flex items-center justify-center rounded-lg border border-zinc-700",
          "text-secondary transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-zinc-800 hover:border-zinc-600"
        )}
        aria-label="Próxima página"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  pages.push(total);

  return pages;
}