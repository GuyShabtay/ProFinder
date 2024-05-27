import { Builder, By, Key, until, Browser } from 'selenium-webdriver';
import { assert } from 'chai'; // Import assert function from Chai

let options = new chrome.Options();
options.addArguments('headless');
options.addArguments('no-sandbox');
options.addArguments('disable-dev-shm-usage');

describe("GET request test", function() {
    it("should navigate to the specified site and verify the URL", async function() {
       let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
        try {
            // Navigate to the specified URL
            await driver.get('https://profinder-vzbv.onrender.com/');
            
            // Wait until the page is fully loaded
            await driver.wait(until.urlIs('https://profinder-vzbv.onrender.com/'), 10000);

            // Get the current URL
            const currentUrl = await driver.getCurrentUrl();

            // Assert if the current URL matches the expected URL
            assert.equal(currentUrl, 'https://profinder-vzbv.onrender.com/', 'Expected URL does not match actual URL');
        } finally {
            // Close the browser
            await driver.quit();
        }
    });
});
