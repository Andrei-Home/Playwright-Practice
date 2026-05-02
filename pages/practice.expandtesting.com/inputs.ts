import { type Page, type Locator } from '@playwright/test';
import { debug } from '../../utils/logger';

class InputsPage {
    // --- Properties ---
    readonly page: Page;
    readonly inputNumber: Locator;
    readonly inputText: Locator;
    readonly inputPassword: Locator;
    readonly inputDate: Locator;
    readonly displayInputsButton: Locator;
    readonly outputNumber: Locator;
    readonly outputText: Locator;
    readonly outputPassword: Locator;
    readonly outputDate: Locator;

    // --- Constructor ---
    constructor(page: Page) {
        this.page = page;
        this.inputNumber = page.locator('#input-number');
        this.inputText = page.locator('#input-text');
        this.inputPassword = page.locator('#input-password');
        this.inputDate = page.locator('#input-date');
        this.displayInputsButton = page.locator('#btn-display-inputs');
        this.outputNumber = page.locator('#output-number');
        this.outputText = page.locator('#output-text');
        this.outputPassword = page.locator('#output-password');
        this.outputDate = page.locator('#output-date');
    }

    // --- Methods / Actions ---
    async navigate() {
        debug('Navigating to inputs page');
        await this.page.goto('https://practice.expandtesting.com/inputs');
    }

    async submitFormWithValues(data: { number: string, text: string, password: string, date: string }) {
        debug('Submitting input form', {
            number: data.number,
            text: data.text,
            date: data.date,
        });
        await this.inputNumber.fill(data.number);
        await this.inputText.fill(data.text);
        await this.inputPassword.fill(data.password);
        await this.inputDate.fill(data.date);
        await this.displayInputsButton.click();
    }
}
export default InputsPage;