import { test, expect } from '@playwright/test';
import TodosApi from '../../pages/apichallenges.eviltester.com/todos';

test.describe('API - Todos Challenges', () => {
  let todosApi: TodosApi;
  let challengerToken: string;

  test.beforeEach(async ({ request }) => {
    todosApi = new TodosApi(request);
    const response = await todosApi.createChallenger();
    challengerToken = response.headers['x-challenger'];
  });

  test('Challenge 03: GET /todos (200)', async () => {
    const response = await todosApi.getTodos({}, challengerToken);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('todos');
    expect(Array.isArray(response.body.todos)).toBe(true);
  });

  test('Challenge 04: GET /todo (404) not plural', async () => {
    const response = await todosApi.getInvalidTodoEndpoint(challengerToken);
    expect(response.status).toBe(404);
  });

  test('Challenge 05: GET /todos/{id} (200)', async () => {
    // First, get all todos to find a valid ID
    const allTodosResponse = await todosApi.getTodos({}, challengerToken);
    expect(allTodosResponse.status).toBe(200);
    const firstTodo = allTodosResponse.body.todos[0];
    
    if (!firstTodo) {
        test.skip(true, 'No todos found to perform GET /todos/{id}');
        return;
    }

    const response = await todosApi.getTodo(firstTodo.id, challengerToken);
    expect(response.status).toBe(200);
    expect(response.body.todos[0].id).toBe(firstTodo.id);
  });

  test('Challenge 06: GET /todos/{id} (404)', async () => {
    const response = await todosApi.getTodo(999999, challengerToken); // Assuming this ID doesn't exist
    expect(response.status).toBe(404);
  });

  test('Challenge 07: GET /todos (200)?filter', async () => {
    const response = await todosApi.getTodos({ doneStatus: true }, challengerToken);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('todos');
    
    // Check that all returned todos are done
    for (const todo of response.body.todos) {
      expect(todo.doneStatus).toBe(true);
    }
  });

  test('Challenge 08: GET /todos (400) filter not defined', async () => {
    const response = await todosApi.getTodos({ doneStatus: 'not-a-boolean' }, challengerToken);
    expect(response.status).toBe(400);
  });

  test('Challenge 09: POST /todos (201)', async () => {
    const todoData = {
      title: 'New Todo',
      doneStatus: false,
      description: 'Test description'
    };
    const response = await todosApi.createTodo(todoData, challengerToken);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(todoData.title);
  });

  test('Challenge 10: POST /todos (400) doneStatus', async () => {
    const todoData = {
      title: 'Invalid Done Status',
      doneStatus: 'invalid'
    };
    const response = await todosApi.createTodo(todoData, challengerToken);
    expect(response.status).toBe(400);
  });

  test('Challenge 11: POST /todos (400) title too long', async () => {
    const todoData = {
      title: 'A'.repeat(51),
      doneStatus: false
    };
    const response = await todosApi.createTodo(todoData, challengerToken);
    expect(response.status).toBe(400);
  });

  test('Challenge 12: POST /todos (400) description too long', async () => {
    const todoData = {
      title: 'Valid Title',
      description: 'D'.repeat(201)
    };
    const response = await todosApi.createTodo(todoData, challengerToken);
    expect(response.status).toBe(400);
  });

  test('Challenge 13: POST /todos (201) max out content', async () => {
    const todoData = {
      title: 'T'.repeat(50),
      description: 'D'.repeat(200)
    };
    const response = await todosApi.createTodo(todoData, challengerToken);
    expect(response.status).toBe(201);
  });

  test('Challenge 14: POST /todos (413) content too long', async () => {
    const todoData = {
      title: 'Long Payload',
      description: 'L'.repeat(5000)
    };
    const response = await todosApi.createTodo(todoData, challengerToken);
    expect(response.status).toBe(413);
  });

  test('Challenge 15: POST /todos (400) extra', async () => {
    const todoData = {
      title: 'Extra Field',
      priority: 'high'
    };
    const response = await todosApi.createTodo(todoData, challengerToken);
    expect(response.status).toBe(400);
  });
});
