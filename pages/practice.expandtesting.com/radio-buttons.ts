import { type Page, type Locator } from '@playwright/test';
import { debug } from '../../utils/logger';

class RadioButtonsPage {
    // --- Properties ---
    readonly page: Page;
    readonly colorBlue: Locator;
    readonly colorRed: Locator;
    readonly colorYellow: Locator;
    readonly colorBlack: Locator;
    readonly colorGreen: Locator;
    readonly sportBasketball: Locator;
    readonly sportFootball: Locator;
    readonly sportTennis: Locator;

    // --- Constructor ---
    constructor(page: Page) {
        this.page = page;
        this.colorBlue = page.locator('#blue');
        this.colorRed = page.locator('#red');
        this.colorYellow = page.locator('#yellow');
        this.colorBlack = page.locator('#black');
        this.colorGreen = page.locator('#green');
        this.sportBasketball = page.locator('#basketball');
        this.sportFootball = page.locator('#football');
        this.sportTennis = page.locator('#tennis');
    }

    // --- Methods / Actions ---
    async navigate() {
        debug('Navigating to radio buttons page');
        await this.page.goto('https://practice.expandtesting.com/radio-buttons');
    }

    async selectColor(color: 'blue' | 'red' | 'yellow' | 'black' | 'green') {
        debug('Selecting radio color', color);
        const colorMap: Record<string, Locator> = {
            blue: this.colorBlue,
            red: this.colorRed,
            yellow: this.colorYellow,
            black: this.colorBlack,
            green: this.colorGreen,
        };
        await colorMap[color].click();
    }

    async selectSport(sport: 'basketball' | 'football' | 'tennis') {
        debug('Selecting radio sport', sport);
        const sportMap: Record<string, Locator> = {
            basketball: this.sportBasketball,
            football: this.sportFootball,
            tennis: this.sportTennis,
        };
        await sportMap[sport].click();
    }
}
export default RadioButtonsPage;
