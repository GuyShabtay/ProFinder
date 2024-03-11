import { Builder, By, Key, until,Browser } from 'selenium-webdriver';

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('http://localhost:5173/');
    // await driver.wait(until.elementLocated(By.className('navBar')), 10000);
    const loginButton = await driver.findElement(By.linkText('Login'));
    await loginButton.click();

    const emailInput = await driver.findElement(By.name('email'));
    const passwordInput = await driver.findElement(By.name('password'));
    const submitButton = await driver.findElement(By.css('.btn.btn-success'));

    await emailInput.sendKeys('hen@gmail.com');
    await passwordInput.sendKeys('12345678');
    await driver.sleep(5000);
    await submitButton.click();

    // await driver.sleep(7000);
    // const regisButton = await driver.findElement(By.linkText('Register'));
    // await regisButton.click();
  } finally {
    console.log("error")
    //await driver.quit();
  }
})();