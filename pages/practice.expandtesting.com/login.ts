import { type Page, type Locator } from '@playwright/test';

class LoginPage{
    // --- Properties ---
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;

    // --- Constructor ---
    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#submit-login');
        this.successMessage = page.locator('#core h1');
        this.errorMessage = page.locator('.alert-dismissible');
    }

    // --- Methods / Actions ---
    async navigate() {
        await this.page.goto('https://practice.expandtesting.com/login');
    }

    async login(data: { username: string, password: string}) {
        await this.usernameField.fill(data.username);
        await this.passwordField.fill(data.password);
        await this.loginButton.click();
    }

}

export default LoginPage;

