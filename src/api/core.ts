// Centralized API core for all resource modules
import { functionKeyApiService } from '../services/functionKeyApiService';

export const apiCore = {
  get: functionKeyApiService.get.bind(functionKeyApiService),
  post: functionKeyApiService.post.bind(functionKeyApiService),
  put: functionKeyApiService.put.bind(functionKeyApiService),
  patch: functionKeyApiService.patch.bind(functionKeyApiService),
  delete: functionKeyApiService.delete.bind(functionKeyApiService),
};
