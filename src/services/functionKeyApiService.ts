// API service for Azure Function App using x-functions-key authentication

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:7071';
const functionKey = import.meta.env.VITE_FUNCTION_KEY;

export class FunctionKeyApiService {
  private getFunctionKey: () => string | undefined;

  constructor(getFunctionKey: () => string | undefined) {
    this.getFunctionKey = getFunctionKey;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const key = this.getFunctionKey();
    if (!key) {
      throw new Error('No function key available. Please set VITE_FUNCTION_KEY in your .env file.');
    }
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-functions-key': key,
      ...options.headers,
    };
    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers,
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else if (response.status === 204) {
      return null as T;
    } else {
      return await response.text() as T;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }
}

export const functionKeyApiService = new FunctionKeyApiService(() => functionKey);
