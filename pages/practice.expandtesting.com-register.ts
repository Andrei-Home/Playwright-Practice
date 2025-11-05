import { type Page, type Locator } from '@playwright/test';

class RegisterPage{
    // --- Properties ---
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly confirmpasswordField: Locator;
    readonly registerButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;


    // --- Constructor ---
    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.confirmpasswordField = page.locator('#confirmPassword');
        this.registerButton = page.locator('#register button');
        this.successMessage = page.locator('.alert-dismissible');
        this.errorMessage = page.locator('.alert-dismissible');
    }

    // --- Methods / Actions ---
    async navigate() {
        await this.page.goto('https://practice.expandtesting.com/register');
    }

    async register(data: { username: string, password: string, password2: string}) {
        await this.usernameField.fill(data.username);
        await this.passwordField.fill(data.password);
        await this.confirmpasswordField.fill(data.password2);
        await  this.registerButton.click();
    }

}

export default RegisterPage;

