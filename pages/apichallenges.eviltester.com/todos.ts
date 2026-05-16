import { APIRequestContext } from '@playwright/test';
import ApiClient from '../../utils/apiClient';

class TodosApi {
  private readonly apiClient: ApiClient;
  private readonly baseUrl: string = 'https://apichallenges.eviltester.com';

  constructor(request: APIRequestContext) {
    this.apiClient = new ApiClient(request, 'TodosApi');
  }

  async createChallenger() {
    return await this.apiClient.post(`${this.baseUrl}/challenger`);
  }

  async getTodos(params?: Record<string, string | number | boolean>, challengerToken?: string) {
    const headers = challengerToken ? { 'X-CHALLENGER': challengerToken } : {};
    return await this.apiClient.get(`${this.baseUrl}/todos`, { params, headers });
  }

  async getTodo(id: string | number, challengerToken?: string) {
    const headers = challengerToken ? { 'X-CHALLENGER': challengerToken } : {};
    return await this.apiClient.get(`${this.baseUrl}/todos/${id}`, { headers });
  }

  async getInvalidTodoEndpoint(challengerToken?: string) {
    const headers = challengerToken ? { 'X-CHALLENGER': challengerToken } : {};
    return await this.apiClient.get(`${this.baseUrl}/todo`, { headers });
  }

  async createTodo(data: any, challengerToken?: string) {
    const headers = challengerToken ? { 'X-CHALLENGER': challengerToken } : {};
    return await this.apiClient.post(`${this.baseUrl}/todos`, { data, headers });
  }
}

export default TodosApi;
