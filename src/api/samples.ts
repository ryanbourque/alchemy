import { Sample } from '../types';
import { apiCore } from './core';

export interface FetchSamplesResponse {
  data: Sample[];
  total: number;
}

export const fetchSamples = async (
  page = 1,
  pageSize = 10,
  search = '',
  sortBy = 'sampleId',
  sortOrder: 'asc' | 'desc' = 'asc',
  facilityId = '',
  samplePointId = '',
  ownerId = ''
): Promise<FetchSamplesResponse> => {
  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    search,
    sortBy,
    sortOrder,
  });
  if (facilityId) queryParams.append('facilityId', facilityId);
  if (samplePointId) queryParams.append('samplePointId', samplePointId);
  if (ownerId) queryParams.append('ownerId', ownerId);
  const data = await apiCore.get<FetchSamplesResponse>(`/api/Samples?${queryParams.toString()}`);
  if (Array.isArray(data)) {
    return { data: data as Sample[], total: (data as Sample[]).length };
  }
  if (data && typeof data === 'object' && Array.isArray((data as FetchSamplesResponse).data)) {
    return data as FetchSamplesResponse;
  }
  return { data: [], total: 0 };
};

export const createSample = async (newItem: Sample): Promise<Sample> => {
  const payload: Partial<Sample> = {
    sampleId: newItem.sampleId,
    facilityId: newItem.facilityId,
    samplePointId: newItem.samplePointId,
    ownerId: newItem.ownerId,
  };
  if (newItem.facilitatorId !== undefined) payload.facilitatorId = newItem.facilitatorId;
  return await apiCore.post<Sample>('/api/Samples', payload);
};

export const updateSample = async (id: string, updatedData: Partial<Sample>): Promise<boolean> => {
  await apiCore.put(`/api/Samples?id=${encodeURIComponent(id)}`, updatedData);
  return true;
};

export const deleteSample = async (id: string): Promise<boolean> => {
  await apiCore.delete(`/api/Samples?id=${encodeURIComponent(id)}`);
  return true;
};
