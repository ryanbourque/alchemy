import { useState, useEffect, useCallback } from 'react';
import { fetchAccounts, createAccount, updateAccount, deleteAccount } from '../api/accounts';
import { Account } from '../types';

export interface UseAccountsResult {
  data: Account[];
  total: number;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  create: (item: Account) => Promise<void>;
  update: (id: string, item: Partial<Account>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useAccounts(
  page: number,
  pageSize: number,
  search = '',
  sortBy = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
): UseAccountsResult {
  const [data, setData] = useState<Account[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAccounts(page, pageSize, search, sortBy, sortOrder);
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
    async (item: Account) => {
      await createAccount(item);
      await refresh();
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, item: Partial<Account>) => {
      await updateAccount(id, item);
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteAccount(id);
      await refresh();
    },
    [refresh]
  );

  useEffect(() => {
    refresh();
  }, [refresh, search, sortBy, sortOrder]);

  return { data, total, loading, error, refresh, create, update, remove };
}
