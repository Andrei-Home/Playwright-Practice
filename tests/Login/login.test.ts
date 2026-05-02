import { test, expect } from '@playwright/test';
import { Logger } from '../../utils/logger';
import LoginPage from '../../pages/practice.expandtesting.com/login';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;
    const logger = new Logger('LoginPageTest');

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('1. Should login with valid credentials', async ({ page }) => {
        const testData = {
            username: "practice",
            password: "SuperSecretPassword!",
        }
        logger.info(`Running test: 'Should login with valid credentials' with username: ${testData.username}`);
        await loginPage.login(testData);
        await expect(loginPage.successMessage).toHaveText('Secure Area page for Automation Testing Practice');
    });

    test('2. Should not login with invalid credentials', async ({ page }) => {
        const testData = {
            username: "aaa",
            password: "aaa",
        }
        logger.info(`Running test: 'Should not login with invalid credentials' with username: ${testData.username}`);
        await loginPage.login(testData);
        await expect(loginPage.errorMessage).toHaveText('Your password is invalid!');
    });

    test('3. Should not login with invalid password for a valid user', async ({ page }) => {
        const testData = {
            username: "practice",
            password: "aaa",
        }
        logger.info(`Running test: 'Should not login with invalid password for a valid user' with username: ${testData.username}`);
        await loginPage.login(testData);
        await expect(loginPage.errorMessage).toHaveText('Your password is invalid!');
    });
});