import { Builder, By, until, Capabilities, Browser } from 'selenium-webdriver';
import { assert } from 'chai';

const GRID_URL = 'http://192.168.14.102:4444/wd/hub'; // Replace <grid_hub_ip> with the IP address of your Selenium Grid hub

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

describe("edit Location test", function () {
    it("edit Location test on Chrome", async function () {
        let driver = await new Builder()
            .usingServer(GRID_URL)
            .withCapabilities(Capabilities.chrome())
            .build();
        await runTest(driver);
    });

    it("edit Location test on Edge", async function () {
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
        await driver.sleep(1000); // TODO delete this row
        await driver.findElement(By.css('.btn.btn-success')).click();// TODO delete this row
        await driver.wait(until.urlIs('http://localhost:5173/'), 3000);

        const svgButton = await driver.wait(until.elementLocated(By.css("svg.text-2xl.text-yellow-600.hover\\:text-black")), 10000);
        await svgButton.click();

        sleep(1000);

        const inputFields = await driver.findElements(By.css(".border-2.border-gray-500.px-4.py-2.w-full"));
        const secondInputField = inputFields[1];

        await secondInputField.clear();
        await secondInputField.sendKeys('melech');
        await driver.findElement(By.css(".p-2.bg-sky-300.m-8")).click();

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
