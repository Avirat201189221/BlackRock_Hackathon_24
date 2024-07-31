const express = require('express');
const {signUp, addIndianStocks, addMutualFund, addFd, addUsShares, addRbiBonds, addSgbBonds} = require('../controller/user_controller');
const {userValidators} = require('../helper/user_validation');

const router = express.Router();

router.post("/signup", userValidators, signUp);
router.post("/addIndianStocks", addIndianStocks);
router.post("/addMutualFund", addMutualFund);
router.post("/addFd", addFd);
router.post("/addUsShares", addUsShares);
router.post("/addRbiBonds", addRbiBonds);
router.post("/addSgbBonds", addSgbBonds);

module.exports = router;
