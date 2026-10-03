export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
          Painel de controlo
        </p>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-sm text-secondary">
          Resumo das solicitações internas.
        </p>
      </header>

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
