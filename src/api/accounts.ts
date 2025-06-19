import { apiCore } from './core';
import { Account } from '../types';

export interface FetchAccountsResponse {
  data: Account[];
  total: number;
}

export const fetchAccounts = async (
  page = 1,
  pageSize = 10,
  search = '',
  sortBy = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<FetchAccountsResponse> => {
  const endpoint = `/api/Accounts?page=${page}&pageSize=${pageSize}` +
    `&search=${encodeURIComponent(search)}` +
    `&sortBy=${encodeURIComponent(sortBy)}` +
    `&sortOrder=${encodeURIComponent(sortOrder)}`;
  const body = await apiCore.get(endpoint);
  if (Array.isArray(body)) {
    return { data: body as Account[], total: body.length };
  }
  if (body && typeof body === 'object') {
    const resp = body as FetchAccountsResponse;
    if (Array.isArray(resp.data)) {
      return { data: resp.data, total: resp.total };
    }
  }
  return { data: [], total: 0 };
};

export const createAccount = async (newItem: Account): Promise<Account> => {
  const created = await apiCore.post('/api/Accounts', { name: newItem.name });
  return created as Account;
};

export const updateAccount = async (id: string, updatedData: Partial<Account>): Promise<boolean> => {
  const endpoint = `/api/Accounts?id=${encodeURIComponent(id)}`;
  try {
    await apiCore.patch(endpoint, { name: updatedData.name });
    return true;
  } catch (error: unknown) {
    const apiError = error as { message?: string };
    if (apiError.message?.includes('404')) {
      return false;
    }
    throw error;
  }
};

export const deleteAccount = async (id: string): Promise<boolean> => {
  const endpoint = `/api/Accounts?id=${encodeURIComponent(id)}`;
  try {
    await apiCore.delete(endpoint);
    return true;
  } catch (error: unknown) {
    const apiError = error as { message?: string };
    if (apiError.message?.includes('404')) {
      return false;
    }
    throw error;
  }
};

export const fetchAccountById = async (id: string): Promise<Account | null> => {
  const endpoint = `/api/Accounts/${encodeURIComponent(id)}`;
  try {
    const body = await apiCore.get(endpoint);
    if (body && typeof body === 'object' && (body as { id?: string }).id) {
      return body as Account;
    }
    return null;
  } catch (error: unknown) {
    const apiError = error as { message?: string };
    if (apiError.message?.includes('404')) {
      return null;
    }
    throw error;
  }
};