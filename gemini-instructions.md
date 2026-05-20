# Playwright-Practice Project Instructions (Compressed)

## Overview & Tech Stack
- **Framework**: Playwright `@playwright/test` (^1.56.1), TypeScript, Node.js (CommonJS).
- **Goal**: E2E test automation for `practice.expandtesting.com` using **Page Object Model (POM)**.

## Project Structure
```
Playwright-Practice/
├── pages/                # POM classes: practice.expandtesting.com-<feature>.ts
├── tests/                # Test files: <feature>/<name>.test.ts
├── playwright.config.ts  # Firefox, headless, parallel, 2 retries on CI.
└── .github/              # Instructions and workflows.
```

## Page Object Model (POM) Rules
- **Structure**: (1) Properties (readonly Locators), (2) Constructor (init locators), (3) Methods (actions).
- **Conventions**:
  - Filename: `practice.expandtesting.com-<feature>.ts`.
  - Class: `export default ClassName`.
  - Locators: CamelCase (e.g., `loginButton`). Always init in constructor.
  - Required Method: `async navigate()`.
  - Action Methods: Accept data objects (e.g., `data: { user: string }`).

## Test Guidelines
- **Organization**: Group related tests in `test.describe()`.
- **Naming**: Prefix with numbers (e.g., `'1. Should...'`).
- **Data**: Define objects inside tests; use random strings for unique data.
- **Assertions**: Use Playwright `expect` on POM locators (e.g., `toHaveText`, `toBeVisible`).
- **Flow**: Instantiate POM -> `navigate()` -> perform actions -> assert.

## Essential Commands
```bash
npx playwright test           # Run all
npx playwright test <path>    # Run specific
npx playwright show-report    # View HTML report
npx playwright test --ui      # UI Mode
npx playwright codegen <url>  # Record actions
```

## Development Rules (AI & Human)
1. **Always use POM**: No raw selectors in tests.
2. **Type Safety**: Use TypeScript interfaces for parameters and Playwright built-in types (`Page`, `Locator`).
3. **Async/Await**: Mandatory for all actions.
4. **Imports**: ES6 style; relative paths for POMs (`../../pages/...`).
5. **No Duplication**: Encapsulate logic in POM methods.
6. **Git**: Ignore `node_modules`, `test-results`, `playwright-report`.

## Quick Reference
- **Locators**: `page.locator('#id' | '.class' | 'text=...' | '[data-testid=...]')`.
- **Assertions**: `toBeVisible()`, `toHaveText()`, `toContainText()`, `toHaveClass()`.
- **POM Template**:
```typescript
import { type Page, type Locator } from '@playwright/test';
class PageObj {
  readonly page: Page; readonly btn: Locator;
  constructor(page: Page) { this.page = page; this.btn = page.locator('#id'); }
  async navigate() { await this.page.goto('url'); }
}
export default PageObj;
```
