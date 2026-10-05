"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "@/app/components/ui";
import { Button } from "@/app/components/ui";
import { DataTable } from "@/app/components/ui";
import { SolicitacoesFilters } from "@/app/components/ui";
import { CategoryTag } from "@/app/components/ui";
import { Avatar } from "@/app/components/ui";
import { StatusBadge } from "@/app/components/ui";
import { SolicitacaoModal } from "@/app/components/ui";
import { useSolicitacoes } from "@/app/hooks/useSolicitacoes";
import { Download, SlidersHorizontal, Plus, Edit, Eye, Trash2, X } from "lucide-react";
import { SolicitationDisplay, DataTableColumn, UpdateSolicitacaoInput, CreateSolicitacaoInput } from "@/app/types";
import { createSolicitacao, updateSolicitacao, getSolicitacaoById, deleteSolicitacao } from "@/app/lib/api";

export default function SolicitacoesPage() {
  const {
    data,
    total,
    loading,
    loadingMore,
    hasMore,
    pageSize,
    filters,
    setPageSize,
    setFilters,
    setSearch,
    loadMore,
    refresh,
  } = useSolicitacoes();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSolicitacao, setEditingSolicitacao] = useState<UpdateSolicitacaoInput | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [viewingSolicitacao, setViewingSolicitacao] = useState<SolicitationDisplay | null>(null);

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
      width: 165,
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
      width: 72,
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => handleOpenEdit(item)}
            className="h-7.5 w-7.5 flex items-center justify-center rounded-lg text-secondary hover:bg-zinc-800 hover:text-primary transition-colors"
            aria-label="Editar solicitação"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleViewDetails(item)}
            className="h-7.5 w-7.5 flex items-center justify-center rounded-lg text-secondary hover:bg-zinc-800 hover:text-primary transition-colors"
            aria-label="Ver detalhes"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="h-7.5 w-7.5 flex items-center justify-center rounded-lg text-secondary hover:bg-red-900/30 hover:text-red-400 transition-colors"
            aria-label="Excluir solicitação"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleExportCSV = () => {
    toast.error("Não desenvolvemos ainda... aguarde...");
  };

  const handleOpenCreate = () => {
    setEditingSolicitacao(null);
    setModalOpen(true);
  };

  const handleOpenEdit = async (item: SolicitationDisplay) => {
    try {
      const solicitacao = await getSolicitacaoById(item.id);
      setEditingSolicitacao({
        id: solicitacao.id,
        title: solicitacao.title,
        description: solicitacao.description,
        category: solicitacao.category,
        status: solicitacao.status,
      });
    } catch (err) {
      console.error('[Page] Failed to fetch solicitation for edit:', err);
      const mapStatus = (displayStatus: string): "Open" | "InProgress" | "Closed" => {
        switch (displayStatus) {
          case "Aberto": return "Open";
          case "Em Atendimento": return "InProgress";
          case "Concluído": return "Closed";
          default: return "Open";
        }
      };
      setEditingSolicitacao({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        status: mapStatus(item.status),
      });
      toast.warn("Usando dados da tabela (falha ao buscar detalhes)");
    }
    setModalOpen(true);
  };

  const handleViewDetails = async (item: SolicitationDisplay) => {
    try {
      const solicitacao = await getSolicitacaoById(item.id);
      setViewingSolicitacao({
        ...item,
        title: solicitacao.title,
        description: solicitacao.description,
        category: solicitacao.category,
      });
    } catch (err) {
      console.error('[Page] Failed to fetch solicitation for view:', err);
      setViewingSolicitacao(item);
      toast.warn("Usando dados da tabela (falha ao buscar detalhes)");
    }
  };

  const handleDelete = async (item: SolicitationDisplay) => {
    const confirmed = window.confirm(`Tem certeza que deseja excluir a solicitação "${item.title}"?`);
    if (!confirmed) return;

    try {
      await deleteSolicitacao(item.id);
      toast.success("Solicitação excluída com sucesso!");
      refresh();
    } catch (err) {
      console.error('[Page] Failed to delete solicitation:', err);
      const axiosError = err as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || "Erro ao excluir solicitação");
    }
  };

  const handleSubmit = async (data: CreateSolicitacaoInput | UpdateSolicitacaoInput) => {
    setModalLoading(true);
    try {
      if ("id" in data) {
        await updateSolicitacao(data);
        toast.success("Solicitação atualizada com sucesso!");
      } else {
        await createSolicitacao(data);
        toast.success("Solicitação criada com sucesso!");
      }
      setModalOpen(false);
      setEditingSolicitacao(null);
      refresh();
    } catch (err) {
      console.error('[Page] API error:', err);
      const axiosError = err as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || "Erro ao salvar solicitação");
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Solicitações"
        description={`${total > 0 ? total : data.length} registos · sincronizado há 5 minutos`}
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
              onClick={() => setFiltersVisible((v) => !v)}
              leftIcon={<SlidersHorizontal className="h-4 w-4" />}
              aria-label={filtersVisible ? "Ocultar filtros" : "Mostrar filtros"}
              aria-pressed={filtersVisible}
            />
            <Button size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={handleOpenCreate}>
              Nova solicitação
            </Button>
          </div>
        }
      />

      {filtersVisible && (
        <SolicitacoesFilters
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={setSearch}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          categories={["TI", "TH", "Sales", "Finance", "Infra"]}
        />
      )}

      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        emptyMessage="Nenhuma solicitação encontrada"
        loadMore={{
          shown: data.length,
          total,
          hasMore,
          loading: loadingMore,
          onLoadMore: loadMore,
        }}
      />

<SolicitacaoModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingSolicitacao(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingSolicitacao}
        loading={modalLoading}
        categories={["TI", "TH", "Sales", "Finance", "Infra"]}
      />
      <DetailsModal
        isOpen={!!viewingSolicitacao}
        onClose={() => setViewingSolicitacao(null)}
        solicitacao={viewingSolicitacao}
      />
    </div>
  );
}

function DetailsModal({
  isOpen,
  onClose,
  solicitacao,
}: {
  isOpen: boolean;
  onClose: () => void;
  solicitacao: SolicitationDisplay | null;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) dialog.showModal();
    else if (dialog.open) dialog.close();
  }, [isOpen]);

  if (!solicitacao) return null;

  return (
    <dialog
      ref={dialogRef}
      className="solicitacao-modal"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className="bg-zinc-950 rounded-[18px] border border-zinc-800 w-full max-w-130 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        <div className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-zinc-800">
          <h2 className="text-[15px] font-bold text-white">Detalhes da solicitação</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-secondary hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-auto p-4 gap-4">
          <div className="grid gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Código</label>
              <p className="font-mono text-[13px] text-zinc-300">{solicitacao.shortId}</p>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Título</label>
              <p className="text-[14px] font-semibold text-white">{solicitacao.title}</p>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Descrição</label>
              <p className="text-[13px] text-zinc-300 whitespace-pre-wrap">{solicitacao.description}</p>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Categoria</label>
              <CategoryTag category={solicitacao.category} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Solicitante</label>
              <div className="flex items-center gap-3">
                <Avatar initials={solicitacao.authorInitials} size="md" />
                <span className="text-[13px] text-white">{solicitacao.author}</span>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Status</label>
              <StatusBadge
                status={solicitacao.status}
                dotColor={solicitacao.statusDotColor}
                labelColor={solicitacao.statusLabelColor}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Aberto em</label>
              <p className="text-[13px] text-zinc-300">{solicitacao.formattedDate}</p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto">
              Fechar
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .solicitacao-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          margin: 0;
          padding: 0;
          border: none;
          border-radius: 18px;
          background: transparent;
          max-width: 520px;
          width: calc(100% - 32px);
          max-height: calc(100dvh - 32px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
          animation: modal-in 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .solicitacao-modal::backdrop {
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          animation: backdrop-in 180ms ease-out;
        }
        @keyframes modal-in {
          from { opacity: 0; translate: -50% calc(-50% - 8px); }
        }
        @keyframes backdrop-in {
          from { opacity: 0; }
        }
      `}</style>
    </dialog>
  );
}