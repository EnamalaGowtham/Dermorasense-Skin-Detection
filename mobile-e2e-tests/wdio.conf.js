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
        'appium:deviceName': 'Pixel_API_33', // Replace with user emulator name if different
        'appium:automationName': 'UiAutomator2',
        // Assuming the user runs Expo Go or a built APK
        // 'appium:app': path.join(process.cwd(), 'app/android/app-release.apk'),
        'appium:appPackage': 'host.exp.exponent',
        'appium:appActivity': 'host.exp.exponent.LauncherActivity',
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
