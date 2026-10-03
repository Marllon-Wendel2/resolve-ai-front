import { PageHeader } from "@/app/components/ui";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Painel de controlo"
        title="Dashboard"
        description="Resumo das solicitações internas."
      />

      <section className="rounded-xl border border-line bg-surface p-6">
        <p className="text-sm text-secondary">
          Placeholder — o conteúdo real do dashboard entra na próxima etapa.
          Serve agora para <strong className="font-semibold text-primary">validar a
          sidebar</strong>: alterna entre as rotas e confirma que o item ativo muda
          sozinho.
        </p>
      </section>
    </div>
  );
}
