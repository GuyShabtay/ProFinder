import { Builder, By, Key, until,Browser } from 'selenium-webdriver';
import { assert } from 'chai'; // Import assert function from Chai


describe("search bar test",function(){
    it("search bar test success",async function(){
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://localhost:5173/');
        await driver.findElement(By.css('.search-input')).sendKeys('hen');
        await driver.findElement(By.css('.search-button')).click();
        await driver.quit();


    });
});






