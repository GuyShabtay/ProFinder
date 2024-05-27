// webdriver.js

const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Set Chrome options
let chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
chromeOptions.addArguments('--no-sandbox');
chromeOptions.addArguments('--disable-dev-shm-usage');

// Initialize ChromeDriver with options
const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

// Export the driver so it can be used in other files
module.exports = driver;
