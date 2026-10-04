"use client";

import { PageHeader } from "@/app/components/ui";
import { KPICard } from "@/app/components/ui";
import { RecentActivity } from "@/app/components/ui";
import { CategoryChart } from "@/app/components/ui";
import { StatusDonut } from "@/app/components/ui";
import { useDashboard } from "@/app/hooks/useDashboard";
import { useRecentActivity } from "@/app/hooks/useRecentActivity";
import { LayoutDashboard, CircleDot, LoaderCircle, CircleCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function DashboardPage() {
  const { stats, loading: statsLoading, error: statsError } = useDashboard();
  const { solicitations, loading: activityLoading, error: activityError } = useRecentActivity();

  const loading = statsLoading || activityLoading;
  const error = statsError || activityError;

  useEffect(() => {
    if (statsError) {
      toast.error("Erro ao carregar estatísticas do dashboard");
    }
    if (activityError) {
      toast.error("Erro ao carregar atividade recente");
    }
  }, [statsError, activityError]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader
          eyebrow="Painel de controlo"
          title="Dashboard"
          description="Resumo das solicitações internas."
          alignItems="end"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-line bg-surface p-[18px_20px] flex flex-col gap-3.5 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-[10.5px] w-20 bg-zinc-700 rounded" />
                <div className="h-8.5 w-8.5 bg-zinc-700 rounded-[10px]" />
              </div>
              <div className="h-8.5 w-15 bg-zinc-700 rounded" />
              <div className="h-[11.5px] w-10 bg-zinc-700 rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
          <div className="rounded-xl border border-line bg-surface overflow-hidden animate-pulse">
            <div className="px-5.5 py-5 pb-1.5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-0.75">
                  <div className="h-3.75 w-32 bg-zinc-700 rounded" />
                  <div className="h-[11.5px] w-48 bg-zinc-700 rounded" />
                </div>
                <div className="h-[12.5px] w-20 bg-zinc-700 rounded" />
              </div>
            </div>
            <div className="px-5.5 pb-2 space-y-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3.5 pb-3.25 border-b border-zinc-800">
                  <div className="h-8.5 w-8.5 bg-zinc-700 rounded-[10px] shrink-0" />
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="h-[13.5px] w-[60%] bg-zinc-700 rounded" />
                    <div className="h-[11.5px] w-[40%] bg-zinc-700 rounded" />
                  </div>
                  <div className="h-5.5 w-20 bg-zinc-700 rounded-full shrink-0" />
                </div>
              ))}
            </div>
          </div>
          <aside className="flex flex-col gap-4">
            <div className="rounded-xl border border-line bg-surface p-[20px_22px] animate-pulse">
              <div className="h-3.75 w-24 bg-zinc-700 rounded mb-4" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col gap-1.75">
                    <div className="flex justify-between">
                      <div className="h-[12.5px] w-16 bg-zinc-700 rounded" />
                      <div className="h-3 w-10 bg-zinc-700 rounded" />
                    </div>
                    <div className="h-1.5 w-full bg-zinc-600 rounded-[3px]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-surface p-[20px_22px] animate-pulse">
              <div className="h-3.75 w-24 bg-zinc-700 rounded mb-4" />
              <div className="flex flex-col items-center gap-4">
                <div className="relative" style={{ width: 180, height: 180 }}>
                  <div className="w-full h-full bg-zinc-700 rounded-full" />
                </div>
                <div className="space-y-2.5 w-full max-w-xs">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-zinc-700 rounded-full" />
                        <div className="h-[12.5px] w-24 bg-zinc-700 rounded" />
                      </div>
                      <div className="h-[12.5px] w-12 bg-zinc-700 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader
          eyebrow="Painel de controlo"
          title="Dashboard"
          description="Resumo das solicitações internas."
          alignItems="end"
        />
        <div className="rounded-xl border border-line bg-surface p-6 text-center text-secondary">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const kpis = [
    {
      label: "TOTAL DE PEDIDOS",
      value: stats.totalSolicitations,
      icon: LayoutDashboard,
      iconBgColor: "#3a2410",
      iconColor: "#f0a04b",
      delta: "+8%",
      caption: "nos últimos 7 dias",
    },
    {
      label: "ABERTAS",
      value: stats.openSolicitations,
      icon: CircleDot,
      iconBgColor: "#16233a",
      iconColor: "#93c5fd",
      delta: "-12%",
      deltaColor: "#f87171",
      caption: "aguardam atribuição",
    },
    {
      label: "EM ATENDIMENTO",
      value: stats.inProgressSolicitations,
      icon: LoaderCircle,
      iconBgColor: "#2a1c0b",
      iconColor: "#fbbf24",
      delta: "+3",
      caption: "em curso agora",
    },
    {
      label: "CONCLUÍDAS",
      value: stats.closedSolicitations,
      icon: CircleCheck,
      iconBgColor: "#10241a",
      iconColor: "#4ade80",
      delta: "+12%",
      caption: "taxa de resolução 57%",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Painel de controlo"
        title="Dashboard"
        description="Resumo das solicitações internas."
        alignItems="end"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        <RecentActivity solicitations={solicitations} />
        <aside className="flex flex-col gap-4">
          <CategoryChart categories={stats.categories} />
          <StatusDonut
            closed={stats.closedSolicitations}
            inProgress={stats.inProgressSolicitations}
            open={stats.openSolicitations}
            total={stats.totalSolicitations}
          />
        </aside>
      </div>
    </div>
  );
}