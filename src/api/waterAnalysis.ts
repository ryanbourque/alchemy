// api/waterAnalyses.ts
import { WaterAnalysis } from '../types';
import { apiCore } from './core';

export interface FetchWaterAnalysesResponse {
  data: WaterAnalysis[];
  total: number;
}

export const fetchWaterAnalyses = async (
  page = 1,
  pageSize = 10,
  search = '',
  sortBy = 'sampleName',
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<FetchWaterAnalysesResponse> => {
  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    search,
    sortBy,
    sortOrder,
  });
  const data = await apiCore.get<FetchWaterAnalysesResponse>(`/api/WaterAnalyses?${queryParams.toString()}`);
  if (Array.isArray(data)) {
    return { data: data as WaterAnalysis[], total: (data as WaterAnalysis[]).length };
  }
  if (data && typeof data === 'object' && Array.isArray((data as FetchWaterAnalysesResponse).data)) {
    return data as FetchWaterAnalysesResponse;
  }
  return { data: [], total: 0 };
};

export const fetchWaterAnalysisById = async (id: string): Promise<WaterAnalysis> => {
  return await apiCore.get<WaterAnalysis>(`/api/WaterAnalyses/${encodeURIComponent(id)}`);
};

export const createWaterAnalysis = async (newItem: WaterAnalysis): Promise<WaterAnalysis> => {
  return await apiCore.post<WaterAnalysis>('/api/WaterAnalyses', newItem);
};

export const updateWaterAnalysis = async (id: string, updatedData: Partial<WaterAnalysis>): Promise<boolean> => {
  await apiCore.put(`/api/WaterAnalyses?id=${encodeURIComponent(id)}`, updatedData);
  return true;
};

export const deleteWaterAnalysis = async (id: string): Promise<boolean> => {
  await apiCore.delete(`/api/WaterAnalyses?id=${encodeURIComponent(id)}`);
  return true;
};
