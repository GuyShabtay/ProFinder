import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

let options = new chrome.Options();
options.addArguments('headless');
options.addArguments('no-sandbox');
options.addArguments('disable-dev-shm-usage');

let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

describe('GET request test', function () {
    this.timeout(30000);

    after(async function () {
        await driver.quit();
    });

    it('should navigate to the specified site and verify the URL', async function () {
        await driver.get('http://localhost:5173/');
        let url = await driver.getCurrentUrl();
        if (url !== 'http://localhost:5173/') {
            throw new Error(`error`);
        }
    });
});