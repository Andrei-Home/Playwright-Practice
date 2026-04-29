import { test, expect } from '@playwright/test';
import OTPLoginPage from '../../pages/practice.expandtesting.com/otp-login';

// OTP Test
test.describe('OTP Login', () => {
    test('1. Should login with valid email and valid otp', async ({ page }) => {

        const data = 
            { 
                email: "practice@expandtesting.com", 
                otp: "214365",
            };

        const otpLoginPage = new OTPLoginPage(page);
        await otpLoginPage.navigate();
        await otpLoginPage.submitFormWithValues(data);
        await expect(otpLoginPage.successMessage).toHaveText("Secure Area page for Automation Testing Practice")
            
    });

    test('2. Should login with valid email and invalid OTP', async ({ page }) => {

        const data = 
            { 
                email: "practice@expandtesting.com", 
                otp: "21",
            };

        const otpLoginPage = new OTPLoginPage(page);
        await otpLoginPage.navigate();
        await otpLoginPage.submitFormWithValues(data);
        await expect(otpLoginPage.invalidOTPMessage).toHaveText("The provided OTP code is incorrect. Please check your code and try again.")
            
    });

});