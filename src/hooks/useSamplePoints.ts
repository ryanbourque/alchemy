import { useState, useEffect, useCallback } from 'react';
import {
  fetchSamplePoints,
  createSamplePoint,
  updateSamplePoint,
  deleteSamplePoint,
} from '../api/samplepoints'
import { SamplePoint } from '../types';

export interface UseSamplePointsResult {
  data: SamplePoint[];
  total: number;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  create: (item: SamplePoint) => Promise<void>;
  update: (id: string, item: Partial<SamplePoint>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useSamplePoints(
  page: number,
  pageSize: number,
  search = '',
  sortBy = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
): UseSamplePointsResult {
  const [data, setData] = useState<SamplePoint[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSamplePoints(page, pageSize, search, sortBy, sortOrder);
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
    async (item: SamplePoint) => {
      await createSamplePoint(item);
      await refresh();
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, item: Partial<SamplePoint>) => {
      await updateSamplePoint(id, item);
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteSamplePoint(id);
      await refresh();
    },
    [refresh]
  );

  useEffect(() => {
    refresh();
  }, [refresh, search, sortBy, sortOrder]);

  return { data, total, loading, error, refresh, create, update, remove };
}
