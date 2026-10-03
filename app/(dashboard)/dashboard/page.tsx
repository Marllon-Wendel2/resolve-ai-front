"use client";

import { PageHeader } from "@/app/components/ui";
import { KPICard } from "@/app/components/ui";
import { useDashboard } from "@/app/hooks/useDashboard";
import { LayoutDashboard, CircleDot, LoaderCircle, CircleCheck } from "lucide-react";

export default function DashboardPage() {
  const { stats, loading, error } = useDashboard();

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
      // delta: "+8%",
      // caption: "nos últimos 7 dias",
    },
    {
      label: "ABERTAS",
      value: stats.openSolicitations,
      icon: CircleDot,
      iconBgColor: "#16233a",
      iconColor: "#93c5fd",
      deltaColor: "#f87171",
      // delta: "-12%",
      // caption: "aguardam atribuição",
    },
    {
      label: "EM ATENDIMENTO",
      value: stats.inProgressSolicitations,
      icon: LoaderCircle,
      iconBgColor: "#2a1c0b",
      iconColor: "#fbbf24",
      // delta: "+3",
      // caption: "em curso agora",
    },
    {
      label: "CONCLUÍDAS",
      value: stats.closedSolicitations,
      icon: CircleCheck,
      iconBgColor: "#10241a",
      iconColor: "#4ade80",
      // delta: "+12%",
      // caption: "taxa de resolução 57%",
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
    </div>
  );
}