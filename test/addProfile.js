import { Builder, By, Key, until,Browser } from 'selenium-webdriver';
import { assert } from 'chai'; // Import assert function from Chai
// Example test file
const driver = require('./webdriver');

// Your test code using the 'driver' object



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

describe("add profile test",function(){
    it("add profile test",async function(){
        // let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://localhost:5173/');
        await driver.findElement(By.linkText('Login')).click();
        await driver.findElement(By.name('email')).sendKeys('adir@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('123');
        await driver.findElement(By.css('.btn.btn-success')).click();
        await driver.sleep(1000); // TODO delete this row
        await driver.findElement(By.css('.btn.btn-success')).click();// TODO delete this row
        await driver.wait(until.urlIs('http://localhost:5173/'), 3000);
        

        
        const svgButton = await driver.wait(until.elementLocated(By.css("svg.text-sky-800.text-5xl")), 10000);
        await svgButton.click();

        sleep(1000);

        const inputFields = await driver.findElements(By.css(".border-2.border-gray-500.px-4.py-2.w-full"));
        var secondInputField = inputFields[0];

        await secondInputField.clear();
        await secondInputField.sendKeys('business man');
        secondInputField = inputFields[1];
        await secondInputField.sendKeys('new-york');
        secondInputField = inputFields[2];
        await secondInputField.sendKeys('999999999');

        await driver.findElement(By.css(".p-2.bg-sky-300.m-8")).click();
    
        await driver.wait(until.urlIs('http://localhost:5173/'), 3000);

        // Get the current URL
        const currentUrl = await driver.getCurrentUrl();

        // Assert if the current URL matches the expected URL
        assert.equal(currentUrl, 'http://localhost:5173/', 'Expected URL does not match actual URL');
        
        // Close the browser
        await driver.quit();

 

    });
});






