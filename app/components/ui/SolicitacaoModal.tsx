"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { CreateSolicitacaoInput, UpdateSolicitacaoInput } from "@/app/types";

const solicitacaoSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").min(3, "Título deve ter no mínimo 3 caracteres").max(100),
  description: z.string().min(1, "Descrição é obrigatória").min(10, "Descrição deve ter no mínimo 10 caracteres").max(1000),
  category: z.string().min(1, "Categoria é obrigatória"),
  status: z.enum(["Open", "InProgress", "Closed"]).optional(),
});

type SolicitacaoFormData = z.infer<typeof solicitacaoSchema>;

interface SolicitacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSolicitacaoInput | UpdateSolicitacaoInput) => Promise<void>;
  initialData?: UpdateSolicitacaoInput | null;
  loading?: boolean;
  categories?: string[];
}

export function SolicitacaoModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
  categories = ["TI", "TH", "Sales", "Finance", "Infra"],
}: SolicitacaoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm<SolicitacaoFormData>({
    resolver: zodResolver(solicitacaoSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
    },
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) dialog.showModal();
    else if (dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "",
        status: initialData.status || "",
      });
    }
  }, [isOpen, initialData, reset]);

  const handleSubmit = async (data: SolicitacaoFormData) => {
    const submitData = isEdit
      ? { ...data, id: initialData!.id }
      : data;
    await onSubmit(submitData);
  };

  const close = () => {
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={cn("solicitacao-modal")}
      onClose={close}
      onClick={(e) => e.target === dialogRef.current && close()}
    >
      <form
        className="bg-zinc-950 rounded-[18px] border border-zinc-800 w-full overflow-hidden"
        onSubmit={handleSubmitForm(handleSubmit)}
      >
        <div className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-zinc-800">
          <h2 className="text-[15px] font-bold text-white">
            {isEdit ? "Editar solicitação" : "Nova solicitação"}
          </h2>
          <button
            type="button"
            onClick={close}
            className="grid h-9 w-9 place-items-center rounded-lg text-secondary hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-auto p-4 gap-4">
          <Input
            label="Título"
            placeholder="Ex: Notebook não liga"
            error={errors.title?.message}
            {...register("title")}
          />

          <Textarea
            label="Descrição"
            placeholder="Descreva o problema detalhadamente..."
            rows={4}
            error={errors.description?.message}
            {...register("description")}
          />

          <div className="w-full">
            <label htmlFor="category" className="mb-1.5 block text-[12px] font-semibold text-zinc-300">
              Categoria
            </label>
            <div className="relative">
              <select
                id="category"
                aria-invalid={errors.category ? "true" : "false"}
                className="w-full h-11 bg-zinc-900 rounded-[10px] border border-zinc-700 px-3.5 pr-10 text-zinc-100 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                {...register("category")}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            {errors.category && <p className="mt-1.5 text-[11.5px] text-red-400" role="alert">{errors.category.message}</p>}
          </div>

          {isEdit && (
            <div className="w-full">
              <label htmlFor="status" className="mb-1.5 block text-[12px] font-semibold text-zinc-300">
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  aria-invalid={errors.status ? "true" : "false"}
                  className="w-full h-11 bg-zinc-900 rounded-[10px] border border-zinc-700 px-3.5 pr-10 text-zinc-100 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  {...register("status")}
                >
                  <option value="Open">Aberto</option>
                  <option value="InProgress">Em Atendimento</option>
                  <option value="Closed">Concluído</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              {errors.status && <p className="mt-1.5 text-[11.5px] text-red-400" role="alert">{errors.status.message}</p>}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="ghost" onClick={close} className="flex-1">
              Cancelar
            </Button>
            <Button variant="primary" htmlType="submit" loading={loading} className="flex-1">
              {isEdit ? "Salvar alterações" : "Criar solicitação"}
            </Button>
          </div>
        </div>
      </form>
    </dialog>
  );
}