import { type Page, type Locator } from '@playwright/test';
import { debug } from '../../utils/logger';

class BrowserPage {
    // --- Properties ---
    readonly page: Page;
    readonly showBrowserInformationButton: Locator;
    readonly hideBrowserInformationButton: Locator;
    readonly userAgent: Locator;
    readonly codeName: Locator;
    readonly Name: Locator;
    readonly version: Locator;
    readonly cookiesEnabled: Locator;
    readonly platform: Locator;


    // --- Constructor ---
    constructor(page: Page) {
        this.page = page;
        this.showBrowserInformationButton = page.getByRole('button', { name: 'Show Browser Information' });
        this.hideBrowserInformationButton = page.getByRole('button', { name: 'Hide Browser Information' });
        this.userAgent = page.locator('#browser-user-agent');
        this.codeName = page.locator('#browser-code-name');
        this.Name = page.locator('#browser-name');
        this.version = page.locator('#browser-version');
        this.cookiesEnabled = page.locator('#browser-cookie');
        this.platform = page.locator('#browser-platform');
    }

    // --- Methods / Actions ---
    async navigate() {
        await this.page.goto('https://practice.expandtesting.com/my-browser');
    }

    async clickShowBrowserInformation() {
        await this.showBrowserInformationButton.click();
    }
}

export default BrowserPage;