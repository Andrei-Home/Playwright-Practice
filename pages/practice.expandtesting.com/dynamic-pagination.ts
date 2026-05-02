import { type Page, type Locator } from '@playwright/test';
import { debug } from '../../utils/logger';

class DynamicPaginationPage {
    readonly page: Page;
    readonly table: Locator;
    readonly tableRows: Locator;
    readonly pagination: Locator;
    readonly previousButton: Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table = page.locator('#example');
        this.tableRows = page.locator('#example tbody tr');
        this.pagination = page.locator('ul.pagination');
        this.previousButton = page.locator('#example_previous');
        this.nextButton = page.locator('#example_next');
    }

    async navigate() {
        debug('Navigating to dynamic pagination page');
        await this.page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
    }

    async getPageItem(pageNumber: number) {
        debug('Looking up pagination item', pageNumber);
        // The page number is inside an 'a' tag inside the 'li'
        return this.page.locator(`ul.pagination li.paginate_button a`, { hasText: pageNumber.toString() });
    }
}

export default DynamicPaginationPage;
