"use client";

import { cn } from "@/app/lib/cn";
import { ActivityRow } from "./ActivityRow";
import { SolicitationDisplay } from "@/app/types";
import { Monitor, ShoppingCart, Users, Building2, Wallet } from "lucide-react";

const iconMap: Record<string, typeof Monitor> = {
  Monitor,
  ShoppingCart,
  Users,
  Building2,
  Wallet,
};

interface RecentActivityProps {
  solicitations: SolicitationDisplay[];
  onViewAll?: () => void;
  loading?: boolean;
  className?: string;
}

function getIconComponent(name: string) {
  return iconMap[name] || Monitor;
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-[14px] pb-[13px] border-b border-zinc-800 animate-pulse">
      <div className="h-[34px] w-[34px] bg-zinc-700 rounded-[10px] shrink-0" />
      <div className="flex flex-col gap-[4px] flex-1 min-w-0">
        <div className="h-[13.5px] w-[60%] bg-zinc-700 rounded" />
        <div className="h-[11.5px] w-[40%] bg-zinc-700 rounded" />
      </div>
      <div className="h-[22px] w-[80px] bg-zinc-700 rounded-full shrink-0" />
    </div>
  );
}

export function RecentActivity({
  solicitations,
  onViewAll,
  loading = false,
  className,
}: RecentActivityProps) {
  return (
    <section className={cn("rounded-xl border border-line bg-surface overflow-hidden", className)}>
      <div className="flex items-center justify-between px-[22px] py-[20px] pb-[6px]">
        <div className="flex flex-col gap-[3px]">
          <h2 className="text-[15px] font-bold text-primary">Atividade recente</h2>
          <p className="text-[11.5px] text-muted">
            Últimas solicitações registadas no portal
          </p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-[12.5px] font-semibold text-accent hover:underline"
          >
            Ver todas →
          </button>
        )}
      </div>

      <div className="px-[22px] pb-[8px]">
        {loading ? (
          <div className="space-y-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : solicitations.length === 0 ? (
          <p className="text-sm text-secondary py-8 text-center">
            Nenhuma solicitação recente
          </p>
        ) : (
          solicitations.map((sol, index) => {
            const Icon = getIconComponent(sol.categoryIcon);
            const isLast = index === solicitations.length - 1;
            return (
              <ActivityRow
                key={sol.id}
                title={sol.title}
                meta={`${sol.shortId} · ${sol.author} · ${sol.timeAgo}`}
                categoryIcon={Icon}
                categoryBgColor={sol.categoryBgColor}
                iconColor={sol.iconColor}
                status={sol.status}
                statusDotColor={sol.statusDotColor}
                statusLabelColor={sol.statusLabelColor}
                isLast={isLast}
              />
            );
          })
        )}
      </div>
    </section>
  );
}