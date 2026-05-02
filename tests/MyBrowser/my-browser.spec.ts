import { test, expect } from '@playwright/test';
import BrowserPage from '../../pages/practice.expandtesting.com/my-browser';
import { info } from '../../utils/logger';


test.describe('My Browser Information', () => {
    let myBrowserPage: BrowserPage;

    test.beforeEach(async ({ page }) => {
        myBrowserPage = new BrowserPage(page);
        await myBrowserPage.navigate();
    });

    test('should display browser information when the button is clicked', async () => {
        info('Browser information test: clicking show button');
        await myBrowserPage.clickShowBrowserInformation();

        await expect(myBrowserPage.userAgent).toBeVisible();
        await expect(myBrowserPage.codeName).toBeVisible();
        await expect(myBrowserPage.Name).toBeVisible();
        await expect(myBrowserPage.version).toBeVisible();
        await expect(myBrowserPage.cookiesEnabled).toBeVisible();
        await expect(myBrowserPage.platform).toBeVisible();
    });
    //Verify user agent contains chromium
    test('should verify user agent contains chromium', async () => {
        info('Browser information test: verifying user agent');
        await myBrowserPage.clickShowBrowserInformation();

        const userAgent = await myBrowserPage.userAgent.textContent();
        expect(userAgent).toContain('Chrome');
    });

    //Verify codename is Mozilla
    test('should verify codename is Mozilla', async () => {
        info('Browser information test: verifying codename');
        await myBrowserPage.clickShowBrowserInformation();

        const codeName = await myBrowserPage.codeName.textContent();
        expect(codeName).toContain('Mozilla');
    });

    //Verify name is Chrome
    test('should verify name is Chrome', async () => {
        info('Browser information test: verifying name');
        await myBrowserPage.clickShowBrowserInformation();

        const name = await myBrowserPage.Name.textContent();
        expect(name).toContain('Chrome');
    });

    //Verify version
    test('should verify version', async () => {
        info('Browser information test: verifying version');
        await myBrowserPage.clickShowBrowserInformation();

        const version = await myBrowserPage.version.textContent();
        expect(version).toContain('141');
    });

    //Verify cookies are enabled
    test('should verify cookies are enabled', async () => {
        info('Browser information test: verifying cookies');
        await myBrowserPage.clickShowBrowserInformation();

        const cookiesEnabled = await myBrowserPage.cookiesEnabled.textContent();
        expect(cookiesEnabled).toBe('true');
    });

    //Verify platform
    if (process.platform === 'linux') {
        test('Verify platform of the Browser (Linux)', async () => {
            info('Browser information test: verifying platform');
            await myBrowserPage.clickShowBrowserInformation();

            const platform = await myBrowserPage.platform.textContent();
            info('Platform:' + platform);
            expect(platform).toContain('Linux x86_64');
        });
    }
    if (process.platform === 'win32') {
        test('Verify platform of the Browser (Windows)', async () => {
            info('Browser information test: verifying platform');
            await myBrowserPage.clickShowBrowserInformation();

            const platform = await myBrowserPage.platform.textContent();
            info('Platform:' + platform);
            expect(platform).toContain('Windows');
        });
    }
});
