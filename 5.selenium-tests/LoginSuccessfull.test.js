const { Builder, By, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const geckodriver = require("geckodriver");

let driver, waitTime = 20000;

beforeAll(async () => {
    driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new firefox.Options().headless())
        .build();
});

async function getElementByXPath(xpath) {
    const el = await driver.wait(until.elementLocated(By.xpath(xpath)), waitTime);
    return driver.wait(until.elementIsVisible(el), waitTime);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


it('status page must be shown after successfull login', async () => {
    const loginURL = "http://0.0.0.0:8080/default/login";
    await driver.get(loginURL);
    const email = await getElementByXPath("//INPUT[@id='email']");
    const password = await getElementByXPath("//INPUT[@id='password']");
    const submitBtn = await getElementByXPath("//INPUT[@type='submit']");
    email.sendKeys("codesankalp@gmail.com");    //  Your-Email
    password.sendKeys("abcdefg");   //  Your-Password
    await sleep(1000);
    submitBtn.click(); //   click submit to login and redirect to status page.
    await sleep(1000);
    const successURL = await driver.getCurrentUrl();
    const expectedURl = "http://0.0.0.0:8080/default/status";
    expect(successURL).toEqual(expectedURl);
});

afterAll(
    async () => driver.quit()
)
