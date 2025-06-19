import { apiCore } from './core';
import { Facility } from '../types';

export interface FetchFacilitiesResponse {
  data: Facility[];
  total: number;
}

export const fetchFacilities = async (
  page = 1,
  pageSize = 10,
  search = '',
  sortBy = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<FetchFacilitiesResponse> => {
  const endpoint = `/api/Facilities?page=${page}&pageSize=${pageSize}` +
    `&search=${encodeURIComponent(search)}` +
    `&sortBy=${encodeURIComponent(sortBy)}` +
    `&sortOrder=${encodeURIComponent(sortOrder)}`;
  const body = await apiCore.get(endpoint);
  if (Array.isArray(body)) {
    return { data: body as Facility[], total: body.length };
  }
  if (body && typeof body === 'object') {
    const resp = body as FetchFacilitiesResponse;
    if (Array.isArray(resp.data)) {
      return { data: resp.data, total: resp.total };
    }
  }
  return { data: [], total: 0 };
};

export const createFacility = async (newItem: Facility): Promise<Facility> => {
  const created = await apiCore.post('/api/Facilities', { name: newItem.name });
  return created as Facility;
};

export const updateFacility = async (
  id: string,
  updatedData: Partial<Facility>
): Promise<boolean> => {
  const endpoint = `/api/Facilities?id=${encodeURIComponent(id)}`;
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

export const deleteFacility = async (id: string): Promise<boolean> => {
  const endpoint = `/api/Facilities?id=${encodeURIComponent(id)}`;
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

export const fetchFacilityById = async (id: string): Promise<Facility | null> => {
  const endpoint = `/api/Facilities/${encodeURIComponent(id)}`;
  try {
    const body = await apiCore.get(endpoint);
    if (body && typeof body === 'object' && (body as { id?: string }).id) {
      return body as Facility;
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
