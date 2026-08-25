const path = require('path');

exports.config = {
    runner: 'local',
    port: 4723, // Default appium port
    path: '/wd/hub',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554', // Matches the CI emulator
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.join(process.cwd(), '../mobile/android/app/build/outputs/apk/debug/app-debug.apk'),
        'appium:appPackage': 'com.enamalagowtham.mobile',
        'appium:appActivity': 'com.enamalagowtham.mobile.MainActivity',
        'appium:noReset': true,
        'appium:fullReset': false
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'spec',
        ['junit', {
            outputDir: './reports/junit',
            outputFileFormat: function(options) {
                return `results-${options.cid}.xml`
            }
        }],
        ['allure', {
            outputDir: './reports/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    },
    mochaOpts: {
        ui: 'bdd',
        timeout: 90000
    }
}
