"use client";

import { type ReactNode } from "react";
import { cn } from "@/app/lib/cn";

export interface FormLayoutProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
  submitLabel: string;
  submitIcon?: ReactNode;
  loading?: boolean;
  footerAction?: ReactNode;
  className?: string;
  demoHint?: ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function FormLayout({
  title,
  subtitle,
  eyebrow,
  children,
  submitLabel,
  submitIcon,
  loading,
  footerAction,
  className,
  onSubmit,
}: FormLayoutProps) {
  return (
    <div
      className={cn(
        "w-full max-w-108 bg-zinc-950 rounded-[18px] border border-zinc-800 shadow-[0_24px_60px_rgba(0,0,0,0.4)]",
        "p-[40px_36px_32px_36px] flex flex-col gap-6",
        className
      )}
    >
      <div className="absolute top-1 left-1 right-1 h-0.75 rounded-t-[18px] bg-linear-to-r from-amber-300 to-amber-700" aria-hidden="true" />
      
      <div className="flex flex-col gap-2">
        {eyebrow && (
          <p className="text-[10.5px] font-bold tracking-[0.14em] text-accent uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[27px] font-bold tracking-[-0.02em] text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[13px] text-zinc-400 leading-normal">
            {subtitle}
          </p>
        )}
      </div>

      <form className="flex flex-col gap-6" noValidate onSubmit={onSubmit}>
        {children}

        <button
          type="submit"
          disabled={loading}
          className="h-11 w-full bg-accent text-on-accent rounded-[10px] flex items-center justify-center gap-2 font-bold text-[14px] transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <>
              {submitLabel}
              {submitIcon && <span aria-hidden="true">{submitIcon}</span>}
            </>
          )}
        </button>
      </form>

      {footerAction && (
        <p className="text-center text-[12.5px] text-zinc-400">
          {footerAction}
        </p>
      )}
    </div>
  );
}