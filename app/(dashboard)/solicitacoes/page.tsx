"use client";

import { PageHeader } from "@/app/components/ui";
import { Button } from "@/app/components/ui";
import { DataTable } from "@/app/components/ui";
import { SolicitacoesFilters } from "@/app/components/ui";
import { CategoryTag } from "@/app/components/ui";
import { Avatar } from "@/app/components/ui";
import { StatusBadge } from "@/app/components/ui";
import { useSolicitacoes } from "@/app/hooks/useSolicitacoes";
import { MoreHorizontal, Download, SlidersHorizontal, Plus } from "lucide-react";
import { SolicitationDisplay, DataTableColumn } from "@/app/types";

export default function SolicitacoesPage() {
  const {
    data,
    total,
    loading,
    page,
    pageSize,
    filters,
    setPage,
    setFilters,
    setSearch,
  } = useSolicitacoes();

  const columns: DataTableColumn<SolicitationDisplay>[] = [
    {
      key: "shortId",
      title: "CÓDIGO",
      width: 100,
      align: "center",
      render: (item) => (
        <span className="font-mono text-[12px] font-medium text-zinc-400">
          {item.shortId}
        </span>
      ),
    },
    {
      key: "title",
      title: "TÍTULO",
      width: "fill",
      render: (item) => (
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[13.5px] font-semibold text-primary truncate">
            {item.title}
          </span>
          <span className="text-[11.5px] text-muted truncate">
            {item.description}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      title: "CATEGORIA",
      width: 130,
      align: "center",
      render: (item) => <CategoryTag category={item.category} />,
    },
    {
      key: "author",
      title: "SOLICITANTE",
      width: 190,
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar initials={item.authorInitials} size="md" />
          <span className="text-[13px] text-primary">{item.author}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      title: "ABERTO EM",
      width: 125,
      align: "center",
      render: (item) => (
        <span className="text-[12.5px] text-secondary">{item.formattedDate}</span>
      ),
    },
    {
      key: "status",
      title: "ESTADO",
      width: 150,
      align: "center",
      render: (item) => (
        <StatusBadge
          status={item.status}
          dotColor={item.statusDotColor}
          labelColor={item.statusLabelColor}
        />
      ),
    },
    {
      key: "actions",
      title: "",
      width: 48,
      align: "center",
      render: () => (
        <button
          className="h-7.5 w-7.5 flex items-center justify-center rounded-lg text-secondary hover:bg-zinc-800 hover:text-primary transition-colors"
          aria-label="Mais ações"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      ),
    },
  ];

  const handleExportCSV = () => {
    // TODO: Implement CSV export
    console.log("Export CSV");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Solicitações"
        description={`${total} registos · sincronizado há 5 minutos`}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportCSV}
              leftIcon={<Download className="h-4 w-4" />}
            >
              Exportar CSV
            </Button>
            <Button
              variant="ghost"
              size="icon"
              leftIcon={<SlidersHorizontal className="h-4 w-4" />}
              aria-label="Filtros"
            />
            <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Nova solicitação
            </Button>
          </div>
        }
      />

      <SolicitacoesFilters
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={setSearch}
        categories={["Infra", "TI", "Materiais", "Acesso", "RH", "Facilities", "Financeiro"]}
      />

      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        emptyMessage="Nenhuma solicitação encontrada"
        pagination={{
          page,
          pageSize,
          total,
          onPageChange: setPage,
        }}
        onRowClick={(item) => {
          // TODO: Navigate to detail page
          console.log("Row clicked:", item);
        }}
      />
    </div>
  );
}