import { type APIRequestContext, type APIResponse } from '@playwright/test';
import { Logger } from './logger';

export interface ApiClientOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: any;
}

export interface ApiResponse<T = any> {
  status: number;
  statusText: string;
  ok: boolean;
  headers: Record<string, string>;
  body: T;
  raw: APIResponse;
}

export class ApiClient {
  private readonly request: APIRequestContext;
  private readonly logger: Logger;
  private readonly defaultHeaders: Record<string, string>;

  constructor(request: APIRequestContext, context: string = 'api') {
    this.request = request;
    this.logger = new Logger(context);
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Merges custom headers with default headers
   */
  private mergeHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    return { ...this.defaultHeaders, ...customHeaders };
  }

  /**
   * Centralized response handler to parse body and log outcomes
   */
  private async handleResponse<T = any>(response: APIResponse, method: string, url: string): Promise<ApiResponse<T>> {
    const status = response.status();
    const statusText = response.statusText();
    const ok = response.ok();
    
    this.logger.info(`Received ${status} ${statusText} from ${method} ${url}`);
    
    const contentType = response.headers()['content-type'] || '';
    let body: any = null;

    try {
      if (contentType.includes('application/json')) {
        body = await response.json();
      } else {
        body = await response.text();
      }
    } catch (error) {
      this.logger.warn(`Failed to parse response body: ${(error as Error).message}`);
    }

    if (!ok) {
      this.logger.warn(`API Request failed. Status: ${status}, Body:`, body);
    } else {
      this.logger.debug(`API Request succeeded. Body:`, body);
    }

    return {
      status,
      statusText,
      ok,
      headers: response.headers(),
      body: body as T,
      raw: response,
    };
  }

  /**
   * Sends a GET request
   */
  async get<T = any>(endpoint: string, options?: ApiClientOptions): Promise<ApiResponse<T>> {
    this.logger.info(`GET ${endpoint}`);
    const response = await this.request.get(endpoint, {
      headers: this.mergeHeaders(options?.headers),
      params: options?.params,
    });
    return this.handleResponse<T>(response, 'GET', endpoint);
  }

  /**
   * Sends a POST request
   */
  async post<T = any>(endpoint: string, options?: ApiClientOptions): Promise<ApiResponse<T>> {
    this.logger.info(`POST ${endpoint}`);
    this.logger.debug(`Payload:`, options?.data);
    const response = await this.request.post(endpoint, {
      headers: this.mergeHeaders(options?.headers),
      params: options?.params,
      data: options?.data,
    });
    return this.handleResponse<T>(response, 'POST', endpoint);
  }

  /**
   * Sends a PUT request
   */
  async put<T = any>(endpoint: string, options?: ApiClientOptions): Promise<ApiResponse<T>> {
    this.logger.info(`PUT ${endpoint}`);
    this.logger.debug(`Payload:`, options?.data);
    const response = await this.request.put(endpoint, {
      headers: this.mergeHeaders(options?.headers),
      params: options?.params,
      data: options?.data,
    });
    return this.handleResponse<T>(response, 'PUT', endpoint);
  }

  /**
   * Sends a PATCH request
   */
  async patch<T = any>(endpoint: string, options?: ApiClientOptions): Promise<ApiResponse<T>> {
    this.logger.info(`PATCH ${endpoint}`);
    this.logger.debug(`Payload:`, options?.data);
    const response = await this.request.patch(endpoint, {
      headers: this.mergeHeaders(options?.headers),
      params: options?.params,
      data: options?.data,
    });
    return this.handleResponse<T>(response, 'PATCH', endpoint);
  }

  /**
   * Sends a DELETE request
   */
  async delete<T = any>(endpoint: string, options?: ApiClientOptions): Promise<ApiResponse<T>> {
    this.logger.info(`DELETE ${endpoint}`);
    const response = await this.request.delete(endpoint, {
      headers: this.mergeHeaders(options?.headers),
      params: options?.params,
      data: options?.data,
    });
    return this.handleResponse<T>(response, 'DELETE', endpoint);
  }
}

export default ApiClient;
