import { Builder, By, Key, until,Browser } from 'selenium-webdriver';
import { assert } from 'chai'; // Import assert function from Chai

//NOT FINISH


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
        await driver.wait(until.urlIs('http://localhost:5173/'), 3000);

        
        await driver.findElement(By.css(".text-2xl.text-red-600.hover\\:text-black")).click();

        sleep(1000);

        
        // Close the browser
        //await driver.quit();

 

    });
});






