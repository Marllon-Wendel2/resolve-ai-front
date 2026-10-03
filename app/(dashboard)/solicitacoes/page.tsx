export default function SolicitacoesPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-primary">Solicitações</h1>
        <p className="text-sm text-secondary">
          128 registos · sincronizado há 5 minutos
        </p>
      </header>

      <section className="rounded-xl border border-line bg-surface p-6">
        <p className="text-sm text-secondary">
          Placeholder da listagem de solicitações.
        </p>
      </section>
    </div>
  );
}
