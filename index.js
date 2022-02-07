const puppeteer = require("puppeteer");

const url = process.env.URL ?? "https://example.com/";
const minPage = Number(process.env.MINPAGE) ?? 0;
const maxPage = Number(process.env.MAXPAGE) ?? 100;
const skipPage = Number(process.env.SKIPPAGE) ?? 0;

const main = async (url, min, max, skip) => {
  const browser = await puppeteer.launch({ headless: false });
  for (let i = min; i < max; i++ + skip) {
    console.log(i);
    const page = await browser.newPage();

    await page.goto(`${url}${i}`);
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    await page.screenshot({ path: `screenshots/${i}.png` });
    await page.close();
  }

  await browser.close();
};

main(url, minPage, maxPage, skipPage);
