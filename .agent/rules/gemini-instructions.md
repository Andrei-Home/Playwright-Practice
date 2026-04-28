---
trigger: always_on
---

# Gemini Instructions for Playwright-Practice Project

## Project Overview

This is a **Playwright (TypeScript)** end-to-end test automation project using `@playwright/test` framework. The project tests various web pages on `practice.expandtesting.com` and follows the **Page Object Model (POM)** design pattern for maintainability and reusability.

### Tech Stack
- **Framework**: Playwright `@playwright/test` (^1.56.1)
- **Language**: TypeScript
- **Runtime**: Node.js with CommonJS modules (`"type": "commonjs"`)
- **Dependencies**: `dotenv` for environment variables (optional)

---

## Project Structure

```
Playwright-Practice/
├── pages/                          # Page Object Model classes
│   ├── practice.expandtesting.com-login.ts
│   ├── practice.expandtesting.com-register.ts
│   ├── practice.expandtesting.com-inputs.ts
│   ├── practice.expandtesting.com-otp-login.ts
│   └── practice.expandtesting.com-dynamic-pagination.ts
├── tests/                          # Test files organized by feature
│   ├── Login/
│   │   └── login.test.ts
│   ├── Register/
│   │   └── register.test.ts
│   ├── Inputs/
│   │   └── inputs.test.ts
│   ├── OTP/
│   │   └── otp.test.ts
│   ├── DynamicPagination/
│   │   ├── dynamicPagination.test.ts
│   │   └── inspect.spec.ts
│   ├── example.spec.ts
│   └── seed.spec.ts
├── playwright.config.ts            # Playwright configuration
├── package.json
├── .gitignore
└── .github/
    └── copilot-instructions.md     # GitHub Copilot instructions
```

---

## Page Object Model (POM) Pattern

### Structure & Conventions

All page objects follow a **consistent three-section structure**:

```typescript
import { type Page, type Locator } from '@playwright/test';

class PageName {
    // --- Properties ---
    readonly page: Page;
    readonly elementName: Locator;
    readonly anotherElement: Locator;

    // --- Constructor ---
    constructor(page: Page) {
        this.page = page;
        this.elementName = page.locator('#selector');
        this.anotherElement = page.locator('.class-name');
    }

    // --- Methods / Actions ---
    async navigate() {
        await this.page.goto('https://practice.expandtesting.com/page-url');
    }

    async performAction(data: { field1: string, field2: string }) {
        await this.elementName.fill(data.field1);
        await this.anotherElement.fill(data.field2);
    }
}

export default PageName;
```

### Key Principles

1. **Naming Convention**: Page object files are named `practice.expandtesting.com-<feature>.ts`
2. **Class Export**: Always use `export default ClassName`
3. **Readonly Properties**: All page and locator properties should be `readonly`
4. **Constructor Pattern**: Accept `Page` object in constructor and initialize all locators there
5. **Locator Naming**: Use descriptive camelCase names (e.g., `usernameField`, `loginButton`, `successMessage`)
6. **Method Organization**: 
   - Always include a `navigate()` method
   - Create high-level action methods that accept data objects
   - Keep methods small and focused on single responsibilities
7. **Type Safety**: Use TypeScript interfaces for method parameters (e.g., `data: { username: string, password: string }`)

### Example Page Object

```typescript
class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#submit-login');
        this.successMessage = page.locator('#core h1');
        this.errorMessage = page.locator('.alert-dismissible');
    }

    async navigate() {
        await this.page.goto('https://practice.expandtesting.com/login');
    }

    async login(data: { username: string, password: string }) {
        await this.usernameField.fill(data.username);
        await this.passwordField.fill(data.password);
        await this.loginButton.click();
    }
}
```

---

## Test File Patterns

### Organization

1. **Directory Structure**: Tests are organized in feature-based folders under `tests/`
2. **File Naming**: Use descriptive names ending in `.test.ts` or `.spec.ts`
3. **One Feature Per Folder**: Each feature has its own folder (e.g., `Login/`, `Register/`)

### Best Practices

1. **Test Naming**: 
   - Prefix tests with numbers for ordering (e.g., `'1. Should login with valid credentials'`)
   - Use descriptive names that explain the expected behavior
   - Start with "Should" to describe expected outcomes

2. **Test Data**:
   - Define test data as objects within each test
   - Use descriptive variable names (e.g., `testData`, `credentials`)
   - For unique data, use `Math.random().toString().substr(2)` to generate random strings

3. **Assertions**:
   - Use Playwright's built-in assertions (`expect` from `@playwright/test`)
   - Prefer specific matchers: `toHaveText()`, `toContainText()`, `toBeVisible()`, `toHaveClass()`
   - Assert on page object locators, not raw selectors

4. **Test Grouping**:
   - Use `test.describe()` to group related tests
   - Provide clear descriptions for test suites

5. **Page Object Usage**:
   - Always instantiate page objects at the start of each test
   - Call `navigate()` before performing actions
   - Use page object methods instead of direct selector queries

