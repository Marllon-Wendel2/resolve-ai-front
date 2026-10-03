"use client";

import { useState, useEffect } from "react";
import { getDashboardStats } from "@/app/lib/api";
import { DashboardStats } from "@/app/types";

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    getDashboardStats()
      .then((data) => {
        if (mounted) setStats(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Erro ao carregar estatísticas");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { stats, loading, error };
}