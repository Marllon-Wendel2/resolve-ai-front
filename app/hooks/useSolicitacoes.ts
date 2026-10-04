"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getSolicitacoes } from "@/app/lib/api";
import { transformSolicitations } from "@/app/lib/solicitationUtils";
import { SolicitationDisplay, SolicitacoesParams } from "@/app/types";
import { toast } from "react-toastify";

interface UseSolicitacoesReturn {
  data: SolicitationDisplay[];
  total: number;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  filters: {
    category: string | undefined;
    status: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    search: string | undefined;
    orderBy: "asc" | "desc";
  };
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setFilters: (filters: Partial<SolicitacoesParams>) => void;
  setSearch: (search: string) => void;
  refresh: () => void;
}

export function useSolicitacoes(): UseSolicitacoesReturn {
  const [data, setData] = useState<SolicitationDisplay[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);
  const [filters, setFiltersState] = useState<{
    category: string | undefined;
    status: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    search: string | undefined;
    orderBy: "asc" | "desc";
  }>({
    category: undefined,
    status: undefined,
    startDate: undefined,
    endDate: undefined,
    search: undefined,
    orderBy: "desc",
  });

  const isInitialLoad = useRef(true);

  const fetchData = useCallback(async () => {
    const isRefresh = !isInitialLoad.current;
    if (!isRefresh) {
      setLoading(true);
    }
    setError(null);

    try {
      const params: SolicitacoesParams = {
        limit: pageSize,
        offset: (page - 1) * pageSize,
        orderBy: filters.orderBy,
        category: filters.category || undefined,
        status: filters.status || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        search: filters.search || undefined,
      };

      const response = await getSolicitacoes(params);
      setData(transformSolicitations(response.data));
      setTotal(response.total);
      if (isRefresh) {
        toast.success("Lista atualizada");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao carregar solicitações";
      setError(message);
      setData([]);
      setTotal(0);
      if (isRefresh) {
        toast.error(message);
      }
    } finally {
      setLoading(false);
      isInitialLoad.current = false;
    }
  }, [page, pageSize, filters]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetchData updates state internally, standard data fetching pattern
    fetchData();
  }, [fetchData]);

  const setPageSize = (newPageSize: number) => {
    setPageSizeState(newPageSize);
    setPage(1);
  };

  const setFilters = (newFilters: Partial<SolicitacoesParams>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const setSearch = (search: string) => {
    setFiltersState((prev) => ({ ...prev, search }));
    setPage(1);
  };

  const refresh = () => {
    fetchData();
  };

  return {
    data,
    total,
    loading,
    error,
    page,
    pageSize,
    filters,
    setPage,
    setPageSize,
    setFilters,
    setSearch,
    refresh,
  };
}