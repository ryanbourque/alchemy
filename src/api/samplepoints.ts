import { SamplePoint } from '../types';
import { apiCore } from './core';

export interface FetchSamplePointsResponse {
  data: SamplePoint[];
  total: number;
}

export const fetchSamplePoints = async (
  page = 1,
  pageSize = 10,
  search = '',
  sortBy = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<FetchSamplePointsResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    search,
    sortBy,
    sortOrder,
  });
  const data = await apiCore.get<FetchSamplePointsResponse>(`/api/SamplePoints?${params.toString()}`);
  if (Array.isArray(data)) {
    return { data: data as SamplePoint[], total: (data as SamplePoint[]).length };
  }
  if (data && typeof data === 'object' && Array.isArray((data as FetchSamplePointsResponse).data)) {
    return data as FetchSamplePointsResponse;
  }
  return { data: [], total: 0 };
};

export const createSamplePoint = async (newItem: SamplePoint): Promise<SamplePoint> => {
  const payload = {
    name: newItem.name,
    facilityId: newItem.facilityId,
    wellVessel: newItem.wellVessel,
    location: newItem.location,
  };
  return await apiCore.post<SamplePoint>('/api/SamplePoints', payload);
};

export const updateSamplePoint = async (id: string, updatedData: Partial<SamplePoint>): Promise<boolean> => {
  await apiCore.put(`/api/SamplePoints?id=${encodeURIComponent(id)}`, updatedData);
  return true;
};

export const deleteSamplePoint = async (id: string): Promise<boolean> => {
  await apiCore.delete(`/api/SamplePoints?id=${encodeURIComponent(id)}`);
  return true;
};

export const fetchSamplePointById = async (id: string): Promise<SamplePoint | null> => {
  try {
    const data = await apiCore.get<SamplePoint>(`/api/SamplePoints/${encodeURIComponent(id)}`);
    if (data && typeof data === 'object' && (data as SamplePoint).id) {
      return data as SamplePoint;
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
