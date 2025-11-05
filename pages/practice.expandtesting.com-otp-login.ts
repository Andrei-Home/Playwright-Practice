import { type Page, type Locator } from '@playwright/test';

class OTPLoginPage {
    // --- Properties ---
    readonly page: Page;
    readonly emailAddressField: Locator;
    readonly sendOTPCodeButton: Locator;
    readonly OTPCodeField: Locator;
    readonly verifyOTPCodeButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;
    readonly invalidOTPMessage: Locator;



    // --- Constructor ---
    constructor(page: Page) {
        this.page = page;
        this.emailAddressField = page.locator('#email');
        this.sendOTPCodeButton = page.locator('#btn-send-otp');
        this.OTPCodeField = page.locator('input[type="number"][id="otp"][name="otp"][placeholder="Enter OTP code"]');
        this.verifyOTPCodeButton = page.locator('#btn-send-verify');
        this.successMessage = page.locator('#core h1');
        this.errorMessage = page.locator('.alert-dismissible');
        this.invalidOTPMessage = page.locator('#otp-message');

    }

    // --- Methods / Actions ---
    async navigate() {
        await this.page.goto('https://practice.expandtesting.com/otp-login');
    }

    async submitFormWithValues(data: { email: string, otp: string}) {
        await this.emailAddressField.fill(data.email);
        await this.sendOTPCodeButton.click();
        await this.OTPCodeField.fill(data.otp);
        await this.verifyOTPCodeButton.click();
    }
}
export default OTPLoginPage;

