import { Builder, By, Key, until,Browser } from 'selenium-webdriver';
import { assert } from 'chai'; // Import assert function from Chai


describe("wtire comment test",function(){
    it("comment test",async function(){
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://localhost:5173/');
        await driver.findElement(By.linkText('Login')).click();
        await driver.findElement(By.name('email')).sendKeys('adir@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('123');
        await driver.findElement(By.css('.btn.btn-success')).click();
        await driver.sleep(1000); // TODO delete this row
        await driver.findElement(By.css('.btn.btn-success')).click();// TODO delete this row
        const button = await driver.findElement(By.css('.btn.btn-success'));
        await driver.wait(until.urlIs('http://localhost:5173/'), 3000);
        const svgButton = await driver.wait(until.elementLocated(By.css("svg.text-2xl.text-blue-600.hover\\:text-black")), 10000);
        await svgButton.click();
        // Locate the textarea element
        await driver.sleep(1000); // TODO delete this row
        const textarea = await driver.findElement(By.css('textarea[placeholder="Write a comment..."]'));
        // Write a comment into the textarea
        await textarea.sendKeys('This is my comment.');
        const svgButton2 = await driver.findElement(By.css('svg.arrow-right'));
        await svgButton2.click();
        // Close the browser
        await driver.quit();


    });
});






