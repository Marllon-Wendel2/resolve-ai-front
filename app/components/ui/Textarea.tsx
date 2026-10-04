"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/app/lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-[12px] font-semibold text-zinc-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "w-full bg-zinc-900 rounded-[10px] border border-zinc-700 px-3.5 py-3 text-zinc-100 placeholder:text-zinc-500 transition-colors resize-none",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p id={errorId} className="mt-1.5 text-[11.5px] text-red-400" role="alert">{error}</p>}
        {helperText && !error && <p id={helperId} className="mt-1.5 text-[11.5px] text-zinc-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";