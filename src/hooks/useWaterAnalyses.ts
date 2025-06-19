// hooks/useWaterAnalyses.ts
import { useState, useEffect, useCallback } from 'react';
import {
  fetchWaterAnalyses,
  createWaterAnalysis,
  updateWaterAnalysis,
  deleteWaterAnalysis,
} from '../api/waterAnalysis';
import { WaterAnalysis } from '../types';

export interface UseWaterAnalysesResult {
  data: WaterAnalysis[];
  total: number;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  create: (item: Partial<WaterAnalysis>) => Promise<void>;
  update: (id: string, item: Partial<WaterAnalysis>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useWaterAnalyses(
  page: number,
  pageSize: number,
  search = '',
  sortBy = 'sampleName',
  sortOrder: 'asc' | 'desc' = 'asc'
): UseWaterAnalysesResult {
  const [data, setData] = useState<WaterAnalysis[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWaterAnalyses(page, pageSize, search, sortBy, sortOrder);
      setData(res.data);
      setTotal(res.total);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, sortBy, sortOrder]);

  const create = useCallback(
    async (item: Partial<WaterAnalysis>) => {
      await createWaterAnalysis(item);
      await refresh();
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, item: Partial<WaterAnalysis>) => {
      await updateWaterAnalysis(id, item);
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteWaterAnalysis(id);
      await refresh();
    },
    [refresh]
  );

  useEffect(() => {
    refresh();
  }, [refresh, search, sortBy, sortOrder]);

  return { data, total, loading, error, refresh, create, update, remove };
}
