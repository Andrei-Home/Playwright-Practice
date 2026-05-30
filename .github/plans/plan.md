# Playwright API Testing Challenges - Plan

## GET Challenges

| ID | Challenge | Done | Description |
| :--- | :--- | :--- | :--- |
| 03 | GET /todos (200) | false | GET `/todos` endpoint |
| 04 | GET /todo (404) not plural | false | GET `/todo` endpoint (invalid pluralization) |
| 05 | GET /todos/{id} (200) | false | GET `/todos/{id}` for a specific todo |
| 06 | GET /todos/{id} (404) | false | GET `/todos/{id}` for a non-existent todo |
| 07 | GET /todos (200)?filter | false | GET `/todos?done=true` (must filter only done todos; both done/not done must exist) |
| 08 | GET /todos (400) filter not defined | false | GET `/todos` with undefined query filter |

## POST Challenges

| ID | Challenge | Done | Description |
| :--- | :--- | :--- | :--- |
| 09 | POST /todos (201) | false | POST `/todos` with valid JSON payload (requires X-CHALLENGER header) |
| 10 | POST /todos (400) doneStatus | false | POST `/todos` with non-boolean `doneStatus` field to fail validation |
| 11 | POST /todos (400) title too long | false | POST `/todos` with title exceeding maximum of 50 characters to fail validation |
| 12 | POST /todos (400) description too long | false | POST `/todos` with description exceeding maximum of 200 characters to fail validation |
| 13 | POST /todos (201) max out content | false | POST `/todos` with maximum length fields (50 char title and 200 char description) |
| 14 | POST /todos (413) content too long | false | POST `/todos` with payload exceeding 5000 characters |
| 15 | POST /todos (400) extra | false | POST `/todos` containing unrecognized extra fields (e.g. `priority`) to fail validation |