import { useState, useEffect, useCallback } from 'react';
import {
  fetchSamples,
  createSample,
  updateSample,
  deleteSample,
} from '../api/samples';
import { Sample } from '../types';

export interface UseSamplesResult {
  data: Sample[];
  total: number;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  create: (item: Sample) => Promise<void>;
  update: (id: string, item: Partial<Sample>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useSamples(
  page: number,
  pageSize: number,
  search = '',
  sortBy = 'sampleId',
  sortOrder: 'asc' | 'desc' = 'asc',
  facilityId = '',
  samplePointId = '',
  ownerId = ''
): UseSamplesResult {
  const [data, setData] = useState<Sample[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSamples(
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
        facilityId,
        samplePointId,
        ownerId
      );
      setData(res.data);
      setTotal(res.total);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, sortBy, sortOrder, facilityId, samplePointId, ownerId]);

  const create = useCallback(
    async (item: Sample) => {
      await createSample(item);
      await refresh();
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, item: Partial<Sample>) => {
      await updateSample(id, item);
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteSample(id);
      await refresh();
    },
    [refresh]
  );

  useEffect(() => {
    refresh();
  }, [refresh, search, sortBy, sortOrder, facilityId, samplePointId, ownerId]);

  return { data, total, loading, error, refresh, create, update, remove };
}
