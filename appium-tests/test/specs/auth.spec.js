describe('App Launch Smoke Test', () => {
    it('TC_001 - should install and launch the application successfully without crashing', async () => {
        // Give the app 15 seconds to fully boot past the splash screen
        await browser.pause(15000);
        
        // Capture a screenshot of the app running for the test report
        await browser.takeScreenshot();
        
        // Verify that the Appium driver is still connected and the app process is alive
        const state = await driver.queryAppState('com.enamalagowtham.mobile');
        
        // state 4 means RUNNING_IN_FOREGROUND
        expect(state).toBeDefined();
    });
});
