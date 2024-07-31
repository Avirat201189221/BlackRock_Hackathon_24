const puppeteer = require("puppeteer");
const {
  getMututalFundUrl,
  getIndianStockMarket,
  getUSStockMarket,
} = require("../constants/urls");

module.exports.scrapeMutualFunds = async (req, res) => {
  try {
    const time = req.params?.time || "1 Year";
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = getMututalFundUrl(req.params?.type);
    await page.goto(url);

    await page.waitForSelector("#wzrk-cancel");
    await page.click("#wzrk-cancel");

    await page.waitForSelector("td");

    const result = await page.evaluate((time) => {
      const tdElement = Array.from(document.querySelectorAll("td")).find(
        (el) => el.textContent.trim() === time
      );

      if (tdElement) {
        const targetElement =
          tdElement.nextElementSibling.nextElementSibling.nextElementSibling;
        return targetElement ? targetElement.textContent.trim() : null;
      }
      return null;
    }, time);

    await browser.close();
    return res
      .status(200)
      .json({ message: "Scraped", data: parseFloat(result) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Scraping failed" });
  }
};

module.exports.scrapeFixedDeposit = async (req, res) => {
  try {
    const months = req.params?.months || 24;
    const amount = req.params?.amount || 500000;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      "https://www.moneycontrol.com/fixed-deposit/fd-interest-rates/state-bank-india-BSB001/"
    );

    await page.waitForSelector("#wzrk-cancel");
    await page.click("#wzrk-cancel");

    await page.waitForSelector("#investAmount");
    await page.waitForSelector("#investTenure");

    await page.evaluate((amount) => {
      document.querySelector("#investAmount").value = amount;
    }, amount);

    await page.evaluate((months) => {
      document.querySelector("#investTenure").value = months;
    }, months);

    const result = await page.evaluate(() => {
      const spanElements = Array.from(document.querySelectorAll("span"));
      const interestRateSpan = spanElements.find(
        (el) => el.textContent.trim() === "Interest Rate"
      );

      if (interestRateSpan) {
        const divElement = interestRateSpan.nextElementSibling;
        const valueSpan = divElement.querySelector("span");
        return valueSpan ? valueSpan.textContent.trim() : null;
      }
      return null;
    });

    await browser.close();
    return res
      .status(200)
      .json({ message: "Scraped", data: parseFloat(result) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Scraping failed" });
  }
};

module.exports.scrapeIndianStockPrice = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = getIndianStockMarket(req.params?.type);

    await page.goto(url);

    await page.waitForSelector("#wzrk-cancel");
    await page.click("#wzrk-cancel");

    await page.waitForSelector("#nsecp");

    const result = await page.evaluate(() => {
      const nsecpElement = document.querySelector("#nsecp");
      if (nsecpElement) {
        const relValue = nsecpElement.getAttribute("rel");
        return parseFloat(relValue);
      }
      return null;
    });

    await browser.close();
    return res.status(200).json({ message: "Scraped", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Scraping failed" });
  }
};

module.exports.scrapeUSStockPrice = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = getUSStockMarket(req.params?.type);
    await page.goto(url);

    const result = await page.evaluate(() => {
      const nsecpElement = document.querySelector("#spotValue");
      if (nsecpElement) {
        const relValue = nsecpElement.getAttribute("value");
        return parseFloat(relValue);
      }
      return null;
    });

    await browser.close();
    return res.status(200).json({ message: "Scraped", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Scraping failed" });
  }
};
