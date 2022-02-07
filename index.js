const puppeteer = require("puppeteer");

const url = process.env.URL ?? "https://example.com";
const minPage = process.env.MINPAGE ?? 0;
const maxPage = process.env.MAXPAGE ?? 100;

const main = async (url, minPage, maxPage) => {
  for (let i = minPage; i < maxPage; i = i + 2) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(`${url}${i}`);
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    await page.screenshot({ path: `screenshots/${i}.png` });

    await browser.close();
  }
};

main(url, minPage, maxPage);
