import { Builder, By, until, Capabilities, Browser } from 'selenium-webdriver';
import { assert } from 'chai';

const GRID_URL = 'http://192.168.14.102:4444/wd/hub'; // Replace <grid_hub_ip> with the IP address of your Selenium Grid hub

describe("login test", function () {
    it("login test on Chrome", async function () {
        let driver = await new Builder()
            .usingServer(GRID_URL)
            .withCapabilities(Capabilities.chrome())
            .build();
        await runTest(driver);
    });

    it("login test on Edge", async function () {
        let driver = await new Builder()
            .usingServer(GRID_URL)
            .withCapabilities(Capabilities.edge())
            .build();
        await runTest(driver);
    });
});

async function runTest(driver) {
    try {
        await driver.get('http://localhost:5173/');
        await driver.findElement(By.linkText('Login')).click();
        await driver.findElement(By.name('email')).sendKeys('adir@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('123');
        await driver.findElement(By.css('.btn.btn-success')).click();

        await driver.wait(until.urlIs('http://localhost:5173/'), 3000);

        // Get the current URL
        const currentUrl = await driver.getCurrentUrl();

        // Assert if the current URL matches the expected URL
        assert.equal(currentUrl, 'http://localhost:5173/', 'Expected URL does not match actual URL');
    } finally {
        // Close the browser
        await driver.quit();
    }
}
