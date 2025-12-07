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

### Test Structure & Conventions

```typescript
import { test, expect } from '@playwright/test';
import PageObjectName from '../../pages/practice.expandtesting.com-feature';

// Use test.describe for grouping related tests
test.describe('Feature Description', () => {

    test('1. Should perform expected behavior', async ({ page }) => {
        const pageObject = new PageObjectName(page);
        await pageObject.navigate();
        
        const testData = {
            field1: "value1",
            field2: "value2"
        };
        
        await pageObject.performAction(testData);
        await expect(pageObject.resultElement).toHaveText('Expected Text');
    });

    test('2. Should handle error case', async ({ page }) => {
        // Test implementation
    });
});
```

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

### Example Test File

```typescript
import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/practice.expandtesting.com-login';

test('1. Should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    const testData = {
        username: "practice",
        password: "SuperSecretPassword!",
    };
    
    await loginPage.login(testData);
    await expect(loginPage.successMessage).toHaveText('Secure Area page for Automation Testing Practice');
});

test('2. Should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    const testData = {
        username: "invalid",
        password: "wrong",
    };
    
    await loginPage.login(testData);
    await expect(loginPage.errorMessage).toHaveText('Your password is invalid!');
});
```

---

## Playwright Configuration

### Current Settings (`playwright.config.ts`)

- **Test Directory**: `./tests`
- **Parallel Execution**: Fully parallel (`fullyParallel: true`)
- **Browser**: Firefox only (headless mode enabled)
- **Retries**: 2 retries on CI, 0 locally
- **Workers**: 1 worker on CI, unlimited locally
- **Reporter**: HTML reporter
- **Trace**: Captured on first retry (`trace: 'on-first-retry'`)
- **Screenshots**: Captured only on failure (`screenshot: 'only-on-failure'`)

### Important Notes

- Chromium and WebKit are commented out but available
- Mobile viewports and branded browsers are available but disabled
- Environment variable support via `dotenv` is available but commented out

---

## Running Tests

### Essential Commands

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/Login/login.test.ts

# Run tests in a specific folder
npx playwright test tests/Register/

# Run with specific browser (from config)
npx playwright test --project=firefox

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Show HTML report
npx playwright show-report
```

### CI Considerations

- The config automatically adjusts for CI environments via `process.env.CI`
- `forbidOnly` prevents accidental `.only()` commits
- Retries and workers are optimized for CI stability

---

## Code Style & TypeScript Guidelines

### General Rules

1. **Import Style**: Use ES6 imports with type imports where appropriate
   ```typescript
   import { type Page, type Locator } from '@playwright/test';
   ```

2. **File Extensions**: All test and page files use `.ts` extension

3. **Type Annotations**: 
   - Always type function parameters
   - Use TypeScript interfaces for complex data structures
   - Leverage Playwright's built-in types (`Page`, `Locator`)

4. **Async/Await**: All Playwright actions should use `async/await`

5. **Comments**: 
   - Use section comments in page objects (`// --- Properties ---`)
   - Add inline comments for complex logic or non-obvious behavior
   - Keep comments concise and meaningful

6. **Formatting**:
   - Use consistent indentation (spaces)
   - Add blank lines between logical sections
   - Keep lines readable (avoid excessive nesting)

---

## Adding New Features

### When Adding a New Page Object

1. Create file in `pages/` following naming convention: `practice.expandtesting.com-<feature>.ts`
2. Follow the three-section structure (Properties, Constructor, Methods)
3. Include `navigate()` method
4. Export as default class
5. Use descriptive locator names

### When Adding New Tests

1. Create feature folder under `tests/` if it doesn't exist
2. Create test file: `<feature>.test.ts`
3. Import the corresponding page object using relative path: `../../pages/...`
4. Use `test.describe()` for grouping if you have multiple related tests
5. Number your tests for clarity
6. Define test data as objects within each test
7. Use page object methods instead of raw selectors

### Example: Adding a New Feature

**Step 1**: Create page object `pages/practice.expandtesting.com-checkout.ts`

```typescript
import { type Page, type Locator } from '@playwright/test';

class CheckoutPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('#product-name');
        this.checkoutButton = page.locator('#checkout-btn');
    }

    async navigate() {
        await this.page.goto('https://practice.expandtesting.com/checkout');
    }

    async completeCheckout(data: { name: string }) {
        await this.productName.fill(data.name);
        await this.checkoutButton.click();
    }
}

export default CheckoutPage;
```

**Step 2**: Create test folder and file `tests/Checkout/checkout.test.ts`

```typescript
import { test, expect } from '@playwright/test';
import CheckoutPage from '../../pages/practice.expandtesting.com-checkout';

test.describe('Checkout Flow', () => {
    test('1. Should complete checkout successfully', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.navigate();
        
        const testData = { name: "Test Product" };
        await checkoutPage.completeCheckout(testData);
        
        // Add assertions
    });
});
```

---

## Debugging & Troubleshooting

### Common Commands

```bash
# Run with UI mode (interactive debugging)
npx playwright test --ui

# Run with trace viewer
npx playwright test --trace on

# Generate code (record actions)
npx playwright codegen https://practice.expandtesting.com

# Show last test trace
npx playwright show-trace trace.zip
```

### Tips

1. **Screenshots**: Automatically captured on failure (check `test-results/`)
2. **Traces**: Captured on first retry (check `test-results/`)
3. **HTML Report**: Generated after test run (open with `npx playwright show-report`)
4. **Console Logs**: Use `console.log()` in tests for debugging (visible in terminal output)

---

## Git & Version Control

### Ignored Files (`.gitignore`)

- `node_modules/`
- `/test-results/`
- `/playwright-report/`
- `/blob-report/`
- `/playwright/.cache/`
- `/playwright/.auth/`

### Best Practices

- Commit page objects and tests together
- Don't commit test results or reports
- Keep `playwright.config.ts` changes minimal and documented

---

## AI Assistant Guidelines

### When Helping with This Project

1. **Always use the Page Object Model**: Never write tests with raw selectors; create or use existing page objects
2. **Follow naming conventions**: Match existing patterns for files, classes, and methods
3. **Maintain structure**: Keep the three-section structure in page objects
4. **Use TypeScript**: Leverage type safety and Playwright's built-in types
5. **Test organization**: Group related tests with `test.describe()`
6. **Data-driven approach**: Use test data objects for flexibility
7. **Descriptive naming**: Make test names self-documenting
8. **Relative imports**: Use correct relative paths for page object imports
9. **Avoid duplication**: Reuse page object methods instead of repeating selector logic
10. **Configuration awareness**: Respect the current Playwright config settings

### Code Generation Priorities

1. **Readability**: Code should be clear and self-explanatory
2. **Maintainability**: Follow established patterns for easy updates
3. **Type Safety**: Use TypeScript features to catch errors early
4. **Reusability**: Create methods that can be used across multiple tests
5. **Testability**: Write tests that are reliable and not flaky

---

## Quick Reference

### Import Statements

```typescript
// For tests
import { test, expect } from '@playwright/test';
import PageObject from '../../pages/practice.expandtesting.com-feature';

// For page objects
import { type Page, type Locator } from '@playwright/test';
```

### Common Assertions

```typescript
await expect(locator).toBeVisible();
await expect(locator).toHaveText('exact text');
await expect(locator).toContainText('partial text');
await expect(locator).toHaveClass(/class-name/);
await expect(page).toHaveTitle('Page Title');
```

### Locator Strategies

```typescript
page.locator('#id')                    // By ID
page.locator('.class')                 // By class
page.locator('button')                 // By tag
page.locator('text=Submit')            // By text
page.locator('[data-testid="submit"]') // By attribute
page.locator('#parent .child')         // By CSS selector
```

---

## Summary

This project emphasizes **clean architecture**, **maintainability**, and **type safety** through:

- Consistent Page Object Model pattern
- Feature-based test organization
- TypeScript for type safety
- Data-driven testing approach
- Descriptive naming conventions
- Comprehensive Playwright configuration

When working on this project, always prioritize **readability** and **maintainability** over brevity. Follow the established patterns, and the codebase will remain clean and easy to extend.
