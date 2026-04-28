import { test, expect } from '@playwright/test';
import BrowserPage from '../../pages/practice.expandtesting.com-my-browser';


test.describe('My Browser Information', () => {
    let myBrowserPage: BrowserPage;
    
    test.beforeEach(async ({ page }) => {
        myBrowserPage = new BrowserPage(page);
        await myBrowserPage.navigate();
    });

    test('should display browser information when the button is clicked', async () => {
        await myBrowserPage.showBrowserInformationButton.click();
        
        await expect(myBrowserPage.userAgent).toBeVisible();
        await expect(myBrowserPage.codeName).toBeVisible();
        await expect(myBrowserPage.Name).toBeVisible();
        await expect(myBrowserPage.version).toBeVisible();
        await expect(myBrowserPage.cookiesEnabled).toBeVisible();
        await expect(myBrowserPage.platform).toBeVisible();
    });
});
