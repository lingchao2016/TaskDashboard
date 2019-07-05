import faker from "faker";
import puppeteer from "puppeteer";
require("babel-polyfill");
var ip = require('ip');
const APP = "http://"+ip.address()+":3000/#/mytasks/new";

const task = {
  subject: faker.lorem.word(),
  description: faker.lorem.sentence(),
  taskType: "1",
  completedPct: "0"
};
let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});


describe("Task form", () => {
  test("Test create a new task function", async () => {
    await page.goto(APP);
    await page.waitForSelector("#task-form");
    await page.click("input[name=subject]");
    await page.type("input[name=subject]", task.subject);
    await page.click("input[name=completedPct]");
    await page.type("input[name=completedPct]", task.completedPct);
    await page.click("select[name=taskType]");
    await page.select("select[name=taskType]", task.taskType);
    await page.click("textarea[name=description]");
    await page.type("textarea[name=description]", task.description);
    await page.click("button[type=submit]");
  }, 16000);
});
/*afterAll(() => {
  browser.close();
});*/
