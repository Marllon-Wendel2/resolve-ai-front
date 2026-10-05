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
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  pageSize: number;
  filters: {
    category: string | undefined;
    status: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    search: string | undefined;
    orderBy: "asc" | "desc";
  };
  setPageSize: (pageSize: number) => void;
  setFilters: (filters: Partial<SolicitacoesParams>) => void;
  setSearch: (search: string) => void;
  loadMore: () => void;
  refresh: () => void;
}

export function useSolicitacoes(): UseSolicitacoesReturn {
  const [data, setData] = useState<SolicitationDisplay[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const buildFilterParams = useCallback(
    (): Pick<
      SolicitacoesParams,
      "orderBy" | "category" | "status" | "startDate" | "endDate" | "search"
    > => ({
      orderBy: filters.orderBy,
      category: filters.category || undefined,
      status: filters.status || undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      search: filters.search || undefined,
    }),
    [filters]
  );

  const fetchData = useCallback(async () => {
    const isRefresh = !isInitialLoad.current;
    if (!isRefresh) {
      setLoading(true);
    }
    setError(null);

    try {
      const params: SolicitacoesParams = {
        limit: pageSize,
        offset: 0,
        ...buildFilterParams(),
      };

      const response = await getSolicitacoes(params);
      const transformed = transformSolicitations(response.data);
      setData(transformed);
      setTotal(response.total);
      setHasMore(transformed.length >= pageSize);
      if (isRefresh) {
        toast.success("Lista atualizada");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao carregar solicitações";
      setError(message);
      setData([]);
      setTotal(0);
      setHasMore(false);
      if (isRefresh) {
        toast.error(message);
      }
    } finally {
      setLoading(false);
      isInitialLoad.current = false;
    }
  }, [pageSize, buildFilterParams]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetchData updates state internally, standard data fetching pattern
    fetchData();
  }, [fetchData]);

  const loadMore = useCallback(async () => {
    if (loading || loadingMore) return;
    setLoadingMore(true);
    setError(null);

    try {
      const params: SolicitacoesParams = {
        limit: pageSize,
        offset: data.length,
        ...buildFilterParams(),
      };

      const response = await getSolicitacoes(params);
      const incoming = transformSolicitations(response.data);
      const seen = new Set(data.map((item) => item.id));
      const fresh = incoming.filter((item) => !seen.has(item.id));
      const nextShown = data.length + fresh.length;
      const totalKnown = response.total > 0;

      setData((prev) => [...prev, ...fresh]);
      if (totalKnown) {
        setTotal(response.total);
      }
      setHasMore(
        fresh.length > 0 &&
          (totalKnown ? nextShown < response.total : incoming.length >= pageSize)
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao carregar mais solicitações";
      setError(message);
      toast.error(message);
    } finally {
      setLoadingMore(false);
    }
  }, [loading, loadingMore, pageSize, data, buildFilterParams]);

  const setPageSize = (newPageSize: number) => {
    setPageSizeState(newPageSize);
  };

  const setFilters = (newFilters: Partial<SolicitacoesParams>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const setSearch = (search: string) => {
    setFiltersState((prev) => ({ ...prev, search }));
  };

  const refresh = () => {
    fetchData();
  };

  return {
    data,
    total,
    loading,
    loadingMore,
    hasMore,
    error,
    pageSize,
    filters,
    setPageSize,
    setFilters,
    setSearch,
    loadMore,
    refresh,
  };
}
