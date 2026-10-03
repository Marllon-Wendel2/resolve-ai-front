"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/app/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      iconPosition = "left",
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-[12px] font-semibold text-zinc-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && iconPosition === "left" && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              "w-full h-11 bg-zinc-900 rounded-[10px] border border-zinc-700 px-3.5 text-zinc-100 placeholder:text-zinc-500 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && iconPosition === "left" && "pl-10",
              rightIcon && iconPosition === "right" && "pr-10",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
          {rightIcon && iconPosition === "right" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 text-[11.5px] text-red-400" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-[11.5px] text-zinc-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";