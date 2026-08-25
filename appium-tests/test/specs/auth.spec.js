const LoginScreen = require('../pageobjects/LoginScreen');

describe('Authentication Flow', () => {
    it('TC_001 - should render the login screen correctly', async () => {
        // Wait for the email input to appear
        await LoginScreen.emailInput.waitForDisplayed({ timeout: 45000 });
        
        // Verify UI elements are present
        const isEmailDisplayed = await LoginScreen.emailInput.isDisplayed();
        const isPasswordDisplayed = await LoginScreen.passwordInput.isDisplayed();
        const isLoginButtonDisplayed = await LoginScreen.loginButton.isDisplayed();
        
        expect(isEmailDisplayed).toBe(true);
        expect(isPasswordDisplayed).toBe(true);
        expect(isLoginButtonDisplayed).toBe(true);
    });
});
