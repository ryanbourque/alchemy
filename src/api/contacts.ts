import { Contact } from '../types';
import { apiCore } from './core';

export interface FetchContactsResponse {
  data: Contact[];
  total: number;
}

export const fetchContacts = async (
  page = 1,
  pageSize = 10,
  search = '',
  sortBy = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<FetchContactsResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    search,
    sortBy,
    sortOrder,
  });
  const data = await apiCore.get<FetchContactsResponse>(`/api/Contacts?${params.toString()}`);
  if (Array.isArray(data)) {
    return { data: data as Contact[], total: (data as Contact[]).length };
  }
  if (data && typeof data === 'object' && Array.isArray((data as FetchContactsResponse).data)) {
    return data as FetchContactsResponse;
  }
  return { data: [], total: 0 };
};

export const createContact = async (newItem: Contact): Promise<Contact> => {
  const payload = { name: newItem.name, accountId: newItem.accountId };
  return await apiCore.post<Contact>('/api/Contacts', payload);
};

export const updateContact = async (id: string, updatedData: Partial<Contact>): Promise<boolean> => {
  await apiCore.put(`/api/Contacts?id=${encodeURIComponent(id)}`, updatedData);
  return true;
};

export const deleteContact = async (id: string): Promise<boolean> => {
  await apiCore.delete(`/api/Contacts?id=${encodeURIComponent(id)}`);
  return true;
};

export const fetchContactById = async (id: string): Promise<Contact | null> => {
  try {
    const data = await apiCore.get<Contact>(`/api/Contacts/${encodeURIComponent(id)}`);
    if (data && typeof data === 'object' && (data as Contact).id) {
      return data as Contact;
    }
    return null;
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message: string }).message === 'string') {
      if ((err as { message: string }).message.includes('404')) {
        return null;
      }
    }
    throw err;
  }
};
