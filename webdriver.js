const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTests() {
    // Set up Chrome WebDriver
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to your app's URL
        await driver.get('http://localhost:5173/');

        // Your Selenium test commands go here
        // For example:
        // await driver.findElement(By.css('.navbar-right > button')).click();

        // Wait for tests to complete
        await driver.sleep(2000); // Adjust sleep time as needed

    } finally {
        // Close the WebDriver session
        await driver.quit();
    }
}

// Run the tests
runTests();
