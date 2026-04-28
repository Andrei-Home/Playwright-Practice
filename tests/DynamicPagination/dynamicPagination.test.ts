import { test, expect } from '@playwright/test';
import DynamicPaginationPage from '../../pages/practice.expandtesting.com-dynamic-pagination';

test.describe('Dynamic Pagination Table', () => {

    test('1. Should display table and pagination controls', async ({ page }) => {
        const paginationPage = new DynamicPaginationPage(page);
        await paginationPage.navigate();

        await expect(paginationPage.table).toBeVisible();
        await expect(paginationPage.pagination).toBeVisible();
        await expect(paginationPage.previousButton).toHaveClass(/disabled/);
        await expect(paginationPage.nextButton).toBeVisible();
    });

    test('2. Should navigate to page 2', async ({ page }) => {
        const paginationPage = new DynamicPaginationPage(page);
        await paginationPage.navigate();

        // Capture first row text to compare later
        const firstRowText = await paginationPage.tableRows.first().innerText();

        const page2 = await paginationPage.getPageItem(2);
        await page2.click();

        // Wait for active class on page 2
        await expect(page.locator('ul.pagination li.paginate_button.active')).toHaveText('2');

        // Check content changed
        const newFirstRowText = await paginationPage.tableRows.first().innerText();
        expect(newFirstRowText).not.toBe(firstRowText);
    });

    test('3. Should navigate using Next button', async ({ page }) => {
        const paginationPage = new DynamicPaginationPage(page);
        await paginationPage.navigate();

        await paginationPage.nextButton.click();

        await expect(page.locator('ul.pagination li.paginate_button.active')).toHaveText('2');
        await expect(paginationPage.previousButton).not.toHaveClass(/disabled/);
    });
});
