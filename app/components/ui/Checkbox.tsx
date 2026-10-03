"use client";

import React, { forwardRef } from 'react';
import { Checkbox as AntCheckbox, type CheckboxProps as AntCheckboxProps } from 'antd';
import type { CheckboxRef } from 'antd/es/checkbox';import { cn } from "@/app/lib/cn";

export interface CheckboxProps extends AntCheckboxProps {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const checkboxId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col">
        <AntCheckbox
          ref={ref}
          id={checkboxId}
          className={cn(
            "custom-checkbox flex items-start text-zinc-300 [&>.ant-checkbox]:mt-0.5",
            className
          )}
          {...props}
        >
          {label && (
            <label 
              htmlFor={checkboxId}
              className="text-[12.5px] font-normal text-zinc-300 select-none cursor-pointer"
            >
              {label}
            </label>
          )}
        </AntCheckbox>
        {description && (
          <p className="text-[11.5px] text-zinc-500 ml-6 mt-0.5">{description}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";