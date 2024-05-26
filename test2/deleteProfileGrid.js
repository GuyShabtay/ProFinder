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

describe("deleteProfile test", function () {
    it("delete Profile test on Chrome", async function () {
        let driver = await new Builder()
            .usingServer(GRID_URL)
            .withCapabilities(Capabilities.chrome())
            .build();
        await runTest(driver);
    });

    it("delete Profile test on Edge", async function () {
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

        await driver.findElement(By.css(".text-2xl.text-red-600.hover\\:text-black")).click();

        sleep(1000);

        // Additional actions specific to delete profile test
        
        // Close the browser
        // await driver.quit();
    } finally {
        // Close the browser
        await driver.quit();
    }
}
