"use client";

import React, { forwardRef, type ReactNode } from "react";
import { Button as AntButton, type ButtonProps as AntButtonProps } from "antd";
import { cn } from "@/app/lib/cn";

export interface ButtonProps extends Omit<AntButtonProps, "type" | "size" | "danger" | "ghost" | "variant"> {
  variant?: "primary" | "ghost" | "outline" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "h-9 px-3 text-[12.5px] rounded-[8px]",
      md: "h-11 px-4 text-[14px] rounded-[10px]",
      lg: "h-12 px-6 text-[15px] rounded-[10px]",
      icon: "h-11 w-11 p-0 rounded-[10px]",
    };

    const variantStyles = {
      primary:
        "!bg-accent !text-on-accent hover:!bg-accent/90 hover:!text-on-accent border-none focus:ring-accent",
      ghost: 
        "bg-transparent text-zinc-100 hover:!bg-zinc-800 hover:!text-zinc-100 border-none focus:ring-zinc-700",
      outline:
        "bg-transparent border border-zinc-700 text-zinc-100 hover:!bg-zinc-800 hover:!border-zinc-700 hover:!text-zinc-100 focus:ring-zinc-700",
      destructive:
        "bg-red-600 text-white hover:!bg-red-700 hover:!text-white border-none focus:ring-red-500",
    };

    return (
      <AntButton
        ref={ref}
        disabled={disabled}
        loading={loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-colors shadow-none",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {!loading && leftIcon && <span aria-hidden="true" className="inline-flex items-center">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span aria-hidden="true" className="inline-flex items-center">{rightIcon}</span>}
      </AntButton>
    );
  }
);

Button.displayName = "Button";