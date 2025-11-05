import { test, expect } from '@playwright/test';
import InputsPage from '../../pages/practice.expandtesting.com-inputs';

test('has title', async ({ page }) => {
  const inputsPage = new InputsPage(page);
  await inputsPage.navigate();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Web inputs page for Automation Testing Practice');
});

// test inputs on page: Input Number, Input Text, Input Password, Imput date
test('should display submitted input values', async ({ page }) => {
    const inputsPage = new InputsPage(page);
    await inputsPage.navigate();

    const testData = {
        number: "1234",
        text: "hello world",
        password: "password123",
        date: "2022-11-11"
    };

    await inputsPage.submitFormWithValues(testData);

    await expect(inputsPage.outputNumber).toHaveText(testData.number);
    await expect(inputsPage.outputText).toHaveText(testData.text);
    await expect(inputsPage.outputPassword).toHaveText(testData.password);
    await expect(inputsPage.outputDate).toHaveText(testData.date);

});
