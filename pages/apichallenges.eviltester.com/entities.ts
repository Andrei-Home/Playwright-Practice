import { APIRequestContext } from '@playwright/test';

class EntitiesApi {
    readonly request: APIRequestContext;
    readonly baseUrl: string = 'https://apichallenges.eviltester.com';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getEntities() {
        return await this.request.get(`${this.baseUrl}/sim/entities`);
    }

    async createEntity(name: string) {
        return await this.request.post(`${this.baseUrl}/sim/entities`, { data: { "name": name } });
    }

    async getEntity(id: string | number) {
        return await this.request.get(`${this.baseUrl}/sim/entities/${id}`);
    }

    async updateEntity(id: string | number, name: string) {
        return await this.request.post(`${this.baseUrl}/sim/entities/${id}`, { data: { "name": name } });
    }

    async deleteEntity(id: string | number) {
        return await this.request.delete(`${this.baseUrl}/sim/entities/${id}`);
    }
}

export default EntitiesApi;
