import { PageHeader } from "@/app/components/ui";
import { Button } from "@/app/components/ui";

export default function SolicitacoesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Solicitações"
        description="128 registos · sincronizado há 5 minutos"
        actions={<Button size="sm">Nova solicitação</Button>}
      />

      <section className="rounded-xl border border-line bg-surface p-6">
        <p className="text-sm text-secondary">
          Placeholder da listagem de solicitações.
        </p>
      </section>
    </div>
  );
}
