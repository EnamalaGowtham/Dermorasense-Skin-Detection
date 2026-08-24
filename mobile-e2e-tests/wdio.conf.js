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
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
