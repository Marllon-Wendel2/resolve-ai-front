"use client";

import { useState, useEffect } from "react";
import { getRecentSolicitations } from "@/app/lib/api";
import { transformSolicitations } from "@/app/lib/solicitationUtils";
import { SolicitationDisplay } from "@/app/types";

export function useRecentActivity() {
  const [solicitations, setSolicitations] = useState<SolicitationDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    getRecentSolicitations()
      .then((data) => {
        if (mounted) {
          setSolicitations(transformSolicitations(data));
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Erro ao carregar atividades");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { solicitations, loading, error };
}