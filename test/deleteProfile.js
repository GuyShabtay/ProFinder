import { Builder, By, Key, until,Browser } from 'selenium-webdriver';
import { assert } from 'chai'; // Import assert function from Chai



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }


describe("deleteProfile test",function(){
    it("delete Profile test",async function(){
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://localhost:5173/');
        await driver.findElement(By.linkText('Login')).click();
        await driver.findElement(By.name('email')).sendKeys('adir@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('123');
        await driver.findElement(By.css('.btn.btn-success')).click();
        await driver.sleep(1000); // TODO delete this row
        await driver.findElement(By.css('.btn.btn-success')).click();// TODO delete this row
        await driver.wait(until.urlIs('http://localhost:5173/'), 3000);
        

        const svgButton = await driver.wait(until.elementLocated(By.css("svg.text-2xl.text-red-600.hover\\:text-black")), 10000);
        await svgButton.click();
        sleep(1000);
        await driver.findElement(By.className('p-4 bg-red-600 text-white m-8 w-full')).click();

        
        // Close the browser
        await driver.quit();

 

    });
});






