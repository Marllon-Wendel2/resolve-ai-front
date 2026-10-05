"use client";

import { useState, useRef } from "react";
import { cn } from "@/app/lib/cn";
import { Input } from "./Input";
import { Button } from "./Button";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

interface SolicitacoesFiltersProps {
  filters: {
    category: string | undefined;
    status: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    search: string | undefined;
    orderBy: "asc" | "desc";
  };
  onFiltersChange: (filters: Partial<{
    category: string;
    status: string;
    startDate: string;
    endDate: string;
    search: string;
    orderBy: "asc" | "desc";
  }>) => void;
  onSearch: (search: string) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  categories?: string[];
  className?: string;
}

const STATUS_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "Open", label: "Aberto" },
  { value: "InProgress", label: "Em Atendimento" },
  { value: "Closed", label: "Concluído" },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function SolicitacoesFilters({
  filters,
  onFiltersChange,
  onSearch,
  pageSize,
  onPageSizeChange,
  categories = [],
  className,
}: SolicitacoesFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ [key]: value });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      category: "",
      status: "",
      startDate: "",
      endDate: "",
      search: "",
    });
    setSearchInput("");
  };

  const hasActiveFilters =
    filters.category ||
    filters.status ||
    filters.startDate ||
    filters.endDate ||
    filters.search;

  return (
    <div className={cn("w-full flex flex-wrap gap-3.5 p-[14px_16px] bg-surface border border-line rounded-xl", className)}>
      <div className="flex flex-col gap-1.5 min-w-[320px]">
        <label className="text-[10px] font-bold tracking-widest text-muted">PERÍODO</label>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={filters.startDate || ""}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
            placeholder="Início"
            className="w-37.5 h-9 bg-zinc-900 border-zinc-700"
          />
          <span className="text-muted text-[12px]">até</span>
          <Input
            type="date"
            value={filters.endDate || ""}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
            placeholder="Fim"
            className="w-37.5 h-9 bg-zinc-900 border-zinc-700"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 min-w-42.5">
        <label className="text-[10px] font-bold tracking-widest text-muted">CATEGORIA</label>
        <div className="relative w-37.5">
          <select
            value={filters.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full h-9 bg-zinc-900 border border-zinc-700 rounded-lg px-2.75 py-0 text-[12.5px] text-primary appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          >
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2.75 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 min-w-42.5">
        <label className="text-[10px] font-bold tracking-widest text-muted">ESTADO</label>
        <div className="relative w-37.5">
          <select
            value={filters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full h-9 bg-zinc-900 border border-zinc-700 rounded-lg px-2.75 py-0 text-[12.5px] text-primary appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2.75 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 min-w-42.5">
        <label className="text-[10px] font-bold tracking-widest text-muted">EXIBIR</label>
        <div className="relative w-37.5">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Exibir solicitações por vez"
            className="w-full h-9 bg-zinc-900 border border-zinc-700 rounded-lg px-2.75 py-0 text-[12.5px] text-primary appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2.75 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 min-w-70">
        <label className="text-[10px] font-bold tracking-widest text-muted">PESQUISAR</label>
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Buscar por título, descrição..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-9 bg-zinc-900 border-zinc-700 pr-10"
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput("");
                onSearch("");
              }}
              className="absolute right-2.75 top-1/2 -translate-y-1/2 text-muted hover:text-secondary"
              aria-label="Limpar pesquisa"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 w-full flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          leftIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
          className="h-9"
        >
          Filtros
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-9">
            Limpar filtros
          </Button>
        )}
      </div>
    </div>
  );
}