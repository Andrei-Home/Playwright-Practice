import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/practice.expandtesting.com-register';
import RegisterPage from '../../pages/practice.expandtesting.com-register';

//Register with short username password. Should generate a error
test('1. Should register with short username/password', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate(); 
    const testData = {
        username: "a",
        password: "a",
        password2: "a"
    
    }
    await registerPage.register(testData);
    await expect(registerPage.errorMessage).toHaveText('Username must be at least 3 characters long.');
});

test('2. Should register with empty username', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate(); 
    const testData = {
        username: "",
        password: "a",
        password2: "a",
    
    }
    await registerPage.register(testData);
    await expect(registerPage.errorMessage).toHaveText(' All fields are required. ');
});

test('3. Should register with incorrect confirmation password', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate(); 
    const testData = {
        username: "aaa",
        password: "123456",
        password2: "654321",
    
    }
    await registerPage.register(testData);
    await expect(registerPage.errorMessage).toHaveText(' Passwords do not match. ');
});

test('4. Should register with Success', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const randomUsername = Math.random().toString().substr(2); //Generate random string
    console.log(randomUsername);
    await registerPage.navigate(); 
    const testData = {
        username: randomUsername,
        password: "99andrei11",
        password2: "99andrei11",
    
    }
    await registerPage.register(testData);
    await expect(registerPage.successMessage).toHaveText('Successfully registered, you can log in now.');
});