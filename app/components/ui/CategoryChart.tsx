"use client";

import { cn } from "@/app/lib/cn";

export interface CategoryChartProps {
  categories: Record<string, number>;
  className?: string;
}

const categoryConfig: Record<
  string,
  { label: string; color: string }
> = {
  TI: { label: "TI", color: "#60a5fa" },
  TH: { label: "RH", color: "#fbbf24" },
  Sales: { label: "Vendas", color: "#f9a8d4" },
  Finance: { label: "Financeiro", color: "#86efac" },
  Infra: { label: "Infraestrutura", color: "#f0a04b" },
};

export function CategoryChart({ categories, className }: CategoryChartProps) {
  const entries = Object.entries(categories);
  const maxValue = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-surface p-[20px_22px] flex flex-col gap-4",
        className
      )}
    >
      <h3 className="text-[15px] font-bold text-primary">Por categoria</h3>
      <div className="flex flex-col gap-4">
        {entries.map(([key, value]) => {
          const config = categoryConfig[key] || { label: key, color: "#60a5fa" };
          const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
          return (
            <div key={key} className="flex flex-col gap-1.75">
              <div className="flex justify-between items-center">
                <span className="text-[12.5px] font-semibold text-secondary">
                  {config.label}
                </span>
                <span className="text-[12px] font-mono font-semibold text-primary">
                  {value}
                </span>
              </div>
              <div className="relative h-1.5 w-full bg-zinc-600 rounded-[3px] overflow-hidden">
                {value > 0 && (
                  <div
                    className="h-full rounded-[3px]"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: config.color,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}