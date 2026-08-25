const LoginScreen = require('../pageobjects/LoginScreen');
const DashboardScreen = require('../pageobjects/DashboardScreen');

describe('Authentication Flow', () => {
    it('TC_001 - should allow login with valid credentials', async () => {
        // These tests assume accessibility IDs are present on the React Native components
        // E.g., testID="Email Input" or accessibilityLabel="Email Input"
        await LoginScreen.login('testuser@example.com', 'Password123!');
        
        // Wait for dashboard
        const isDashboardVisible = await DashboardScreen.isDashboardDisplayed();
        expect(isDashboardVisible).toBe(true);
    });

    it('TC_002 - should show error on invalid login', async () => {
        // Reset app state if needed or ensure we're back at login
        // For demonstration, assume we're on login screen
        await LoginScreen.login('wrong@example.com', 'wrongpassword');
        
        await LoginScreen.errorMessage.waitForDisplayed({ timeout: 5000 });
        const errorText = await LoginScreen.errorMessage.getText();
        expect(errorText).toContain('Invalid');
    });
});
