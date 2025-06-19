/**
 * Authenticated API service that automatically includes Bearer tokens
 * in requests to the Azure Function App
 */

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:7071';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export class AuthenticatedApiService {
  private getAccessToken: () => Promise<string | null>;

  constructor(getAccessToken: () => Promise<string | null>) {
    this.getAccessToken = getAccessToken;
  }

  /**
   * Make an authenticated HTTP request
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const accessToken = await this.getAccessToken();
    
    if (!accessToken) {
      throw new Error('No access token available. Please log in.');
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      ...options.headers,
    };

    const url = `${baseUrl}${endpoint}`;
    
    console.log(`[AuthAPI] Making ${options.method || 'GET'} request to:`, url);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      console.error(`[AuthAPI] Request failed:`, response.status, response.statusText);
      
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (response.status === 403) {
        throw new Error('Access denied. You may not have permission to perform this action.');
      } else {
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
      }
    }

    // Handle different response types
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else if (response.status === 204) {
      // No content response
      return null as T;
    } else {
      return await response.text() as T;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }
}

/**
 * Create an authenticated API service instance
 */
export const createAuthenticatedApiService = (
  getAccessToken: () => Promise<string | null>
): AuthenticatedApiService => {
  return new AuthenticatedApiService(getAccessToken);
};
