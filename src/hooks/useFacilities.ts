import { useState, useEffect, useCallback } from 'react';
import {
  fetchFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
} from '../api/facilities';
import { Facility } from '../types';

export interface UseFacilitiesResult {
  data: Facility[];
  total: number;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  create: (item: Facility) => Promise<void>;
  update: (id: string, item: Partial<Facility>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useFacilities(
  page: number,
  pageSize: number,
  search = '',
  sortBy = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
): UseFacilitiesResult {
  const [data, setData] = useState<Facility[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFacilities(page, pageSize, search, sortBy, sortOrder);
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
    async (item: Facility) => {
      await createFacility(item);
      await refresh();
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, item: Partial<Facility>) => {
      await updateFacility(id, item);
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteFacility(id);
      await refresh();
    },
    [refresh]
  );

  useEffect(() => {
    refresh();
  }, [refresh, search, sortBy, sortOrder]);

  return { data, total, loading, error, refresh, create, update, remove };
}
