const express = require('express');
const scrapperController = require('../controllers/scrapper');
const router = express.Router();

router.get("/mutualFund", scrapperController.scrapeMutualFunds);
router.get("/fixedDeposit", scrapperController.scrapeFixedDeposit);
router.get("/indianStockPrice", scrapperController.scrapeIndianStockPrice);
router.get("/usStockPrice", scrapperController.scrapeUSStockPrice);
// app.get("/stockIncrement", scrapperController.scrapeStockIncrement);

module.exports = router;