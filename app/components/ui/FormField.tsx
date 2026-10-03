"use client";

import { type ReactNode } from "react";
import { Input, type InputProps } from "./Input";
import { cn } from "@/app/lib/cn";

export interface FormFieldProps extends Omit<InputProps, "label" | "error" | "helperText"> {
  label: string;
  name: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children?: ReactNode;
}

export function FormField({
  label,
  name,
  error,
  helperText,
  required,
  id,
  children,
  ...props
}: FormFieldProps) {
  const fieldId = id || name;

  return (
    <div className="w-full">
      <label
        htmlFor={fieldId}
        className="mb-1.5 block text-[12px] font-semibold text-zinc-300"
      >
        {label}
        {required && <span className="text-accent ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children ? (
        <div
          id={fieldId}
          className={cn(
            "relative h-11 bg-zinc-900 rounded-[10px] border border-zinc-700 px-3.5",
            "focus-within:ring-2 focus-within:ring-accent focus-within:border-transparent",
            error && "border-red-500 focus-within:ring-red-500"
          )}
        >
          {children}
        </div>
      ) : (
        <Input
          id={fieldId}
          name={name}
          error={error}
          helperText={helperText}
          {...props}
        />
      )}
      {error && (
        <p className="mt-1.5 text-[11.5px] text-red-400" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-[11.5px] text-zinc-500">{helperText}</p>
      )}
    </div>
  );
}