import { test } from '@playwright/test';
import * as fs from 'fs';

test('Inspect Dynamic Pagination Page', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');

    // Wait for table to load
    await page.waitForSelector('table');

    // Get table HTML
    const tableHtml = await page.locator('table').evaluate(el => el.outerHTML);

    // Get pagination HTML
    const paginationHtml = await page.locator('ul.pagination').evaluateAll(els => els.map(el => el.outerHTML));

    fs.writeFileSync('inspect_output.txt', 'Table HTML:\n' + tableHtml + '\n\nPagination HTML:\n' + paginationHtml.join('\n'));
});
