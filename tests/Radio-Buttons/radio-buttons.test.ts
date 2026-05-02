import { test, expect } from '@playwright/test';
import BrowserPage from '../../pages/practice.expandtesting.com/radio-buttons';

test.describe('Radio Buttons', () => {
    let radioButtonsPage: BrowserPage;
    
    test.beforeEach(async ({ page }) => {
        radioButtonsPage = new BrowserPage(page);
        await radioButtonsPage.navigate();
    });

    test.describe('Color Selection @smoke1', () => {
        test('should select blue color', async () => {
            await radioButtonsPage.selectColor('blue');
            await expect(radioButtonsPage.colorBlue).toBeChecked();
        });

        test('should select red color', async () => {
            await radioButtonsPage.selectColor('red');
            await expect(radioButtonsPage.colorRed).toBeChecked();
        });

        test('should select yellow color', async () => {
            await radioButtonsPage.selectColor('yellow');
            await expect(radioButtonsPage.colorYellow).toBeChecked();
        });

        test('should select black color', async () => {
            await radioButtonsPage.selectColor('black');
            await expect(radioButtonsPage.colorBlack).toBeChecked();
        });

        test('should not allow selection of green color as it is disabled', async () => {
            await expect(radioButtonsPage.colorGreen).toBeDisabled();
        });
    });

    test.describe('Sport Selection', () => {
        test('should select basketball sport', async () => {
            await radioButtonsPage.selectSport('basketball');
            await expect(radioButtonsPage.sportBasketball).toBeChecked();
        });

        test('should select football sport', async () => {
            await radioButtonsPage.selectSport('football');
            await expect(radioButtonsPage.sportFootball).toBeChecked();
        });

        test('should select tennis sport', async () => {
            await radioButtonsPage.selectSport('tennis');
            await expect(radioButtonsPage.sportTennis).toBeChecked();
        });
    });

});