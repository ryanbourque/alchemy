import { useState, useEffect, useCallback } from 'react';
import { fetchContacts, createContact, updateContact, deleteContact } from '../api/contacts';
import { Contact } from '../types';

export interface UseContactsResult {
  data: Contact[];
  total: number;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  create: (item: Contact) => Promise<void>;
  update: (id: string, item: Partial<Contact>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useContacts(
  page: number,
  pageSize: number,
  search = '',
  sortBy = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
): UseContactsResult {
  const [data, setData] = useState<Contact[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchContacts(page, pageSize, search, sortBy, sortOrder);
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
    async (item: Contact) => {
      await createContact(item);
      await refresh();
    },
    [refresh]
  );

  const update = useCallback(
    async (id: string, item: Partial<Contact>) => {
      await updateContact(id, item);
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteContact(id);
      await refresh();
    },
    [refresh]
  );

  useEffect(() => {
    refresh();
  }, [refresh, search, sortBy, sortOrder]);

  return { data, total, loading, error, refresh, create, update, remove };
}
