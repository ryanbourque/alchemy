import { useState, useEffect, useCallback } from 'react';
import { fetchAccounts, createAccount, updateAccount, deleteAccount } from '../api/authenticatedAccounts';
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

export function useAuthenticatedAccounts(
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
      console.error('Error fetching accounts:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, sortBy, sortOrder]);

  const create = useCallback(
    async (item: Account) => {
      try {
        await createAccount(item);
        await refresh();
      } catch (err: unknown) {
        console.error('Error creating account:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        throw err;
      }
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, item: Partial<Account>) => {
      try {
        await updateAccount(id, item);
        await refresh();
      } catch (err: unknown) {
        console.error('Error updating account:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        throw err;
      }
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      try {
        await deleteAccount(id);
        await refresh();
      } catch (err: unknown) {
        console.error('Error deleting account:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        throw err;
      }
    },
    [refresh]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, total, loading, error, refresh, create, update, remove };
}
