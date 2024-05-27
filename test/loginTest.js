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


describe("login test",function(){
    it("login test",async function(){
        // let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://profinder-vzbv.onrender.com/');
        await driver.findElement(By.linkText('Login')).click();
        await driver.findElement(By.name('email')).sendKeys('adir@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('123');
        await driver.findElement(By.css('.btn.btn-success')).click();
        await driver.sleep(1000); // TODO delete this row
        await driver.findElement(By.css('.btn.btn-success')).click();// TODO delete this row
        
        
            

        await driver.wait(until.urlIs('https://profinder-vzbv.onrender.com/'), 10000);

        // Get the current URL
        const currentUrl = await driver.getCurrentUrl();

        // Assert if the current URL matches the expected URL
        assert.equal(currentUrl, 'https://profinder-vzbv.onrender.com/', 'Expected URL does not match actual URL');
        
        // Close the browser
        await driver.quit();


    });
});






