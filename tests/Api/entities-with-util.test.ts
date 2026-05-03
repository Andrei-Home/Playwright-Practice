import { test, expect } from '@playwright/test';
import EntitiesApi from '../../pages/apichallenges.eviltester.com/entities';
import { error, warn, info, debug } from '../../utils/logger';


test.describe('API - Entities endpoint with Utils', () => {

    test('1. Should return all 10 entities', async ({ request }) => {
        const entitiesApi = new EntitiesApi(request);
        const response = await entitiesApi.getEntities();

        // Verify status code 200
        expect(response.status()).toBe(200);

        // Verify content type
        expect(response.headers()['content-type']).toContain('application/json');

        const body = await response.json();

        // Verify response structure
        expect(body).toHaveProperty('entities');
        expect(Array.isArray(body.entities)).toBe(true);

        // Verify 10 items
        expect(body.entities.length).toBe(10);

        // Verify Entities 1-10 are present (based on their names)
        const names = body.entities.map((e: any) => e.name);
        for (let i = 1; i <= 10; i++) {
            expect(names).toContain(`entity number ${i}`);
        }
    });

    test('2. Create a new entity', async ({ request }) => {
        const entitiesApi = new EntitiesApi(request);
        const randomName = 'bob';
        const response = await entitiesApi.createEntity(randomName);

        // Verify status code 201
        expect(response.status()).toBe(201);

        // Verify content type
        expect(response.headers()['content-type']).toContain('application/json');

        const body = await response.json();

        // Verify response structure
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('name');
        expect(body.name).toBe(randomName);
    });

    //Update an entity

    test('3. Should update an entity', async ({ request }) => {
        const entitiesApi = new EntitiesApi(request);
        const entityId = 10;
        const newName = 'eris';

        // Update the entity
        const updateResponse = await entitiesApi.updateEntity(entityId, newName);
        expect(updateResponse.status()).toBe(200);

        // Verify it's updated by trying to GET it
        const getResponse = await entitiesApi.getEntity(entityId);
        expect(getResponse.status()).toBe(200);
        const getBody = await getResponse.json();
        expect(getBody.id).toBe(entityId);
        expect(getBody.name).toBe(newName);
    });

    //Delete an entity  

    test('4. Should delete an entity', async ({ request }) => {
        const entitiesApi = new EntitiesApi(request);
        const entityId = 9;

        // Delete the entity
        const deleteResponse = await entitiesApi.deleteEntity(entityId);
        expect(deleteResponse.status()).toBe(204);

        // Verify it's deleted by trying to GET it
        const getResponse = await entitiesApi.getEntity(entityId);
        expect(getResponse.status()).toBe(404);
    });

});
