import { Builder, By, Key, until,Browser } from 'selenium-webdriver';
import { assert } from 'chai'; // Import assert function from Chai


describe("wtire comment test",function(){
    it("comment test",async function(){
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://localhost:5173/');
        await driver.findElement(By.linkText('Login')).click();
        await driver.findElement(By.name('email')).sendKeys('adir@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('123');
        //await driver.findElement(By.css('.btn.btn-success')).click();
        const button = await driver.findElement(By.css('.btn.btn-success'));
        button.click();
        sleep(1000);
        button.click();
        await driver.wait(until.urlIs('http://localhost:5173/'), 3000);
        const svgButton = await driver.wait(until.elementLocated(By.css("svg.text-2xl.text-blue-600.hover\\:text-black")), 10000);
        await svgButton.click();
        sleep(1000);

        // Get the current URL
        const currentUrl = await driver.getCurrentUrl();

        // Assert if the current URL matches the expected URL
        assert.equal(currentUrl, 'http://localhost:5173/', 'Expected URL does not match actual URL');
        
        // Close the browser
        await driver.quit();


    });
});






