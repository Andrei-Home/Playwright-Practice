import { test, expect } from '@playwright/test';
import { info } from '../../utils/logger';
import LoginPage from '../../pages/practice.expandtesting.com/login';

//login form
test('1. Should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const testData = {
        username: "practice",
        password: "SuperSecretPassword!",
    }
    info('Login test: valid credentials', { username: testData.username });
    await loginPage.navigate(); 
    await loginPage.login(testData);
    await expect(loginPage.successMessage).toHaveText('Secure Area page for Automation Testing Practice');
});

test('2. Should login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(); 
    const testData = {
        username: "aaa",
        password: "aaa",
    }
    await loginPage.login(testData);
    await expect(loginPage.errorMessage).toHaveText('Your password is invalid!');

});
test('3. Should login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(); 
    const testData = {
        username: "111",
        password: "aaa",
    }
    await loginPage.login(testData);
    await expect(loginPage.errorMessage).toHaveText('Your password is invalid!');

});