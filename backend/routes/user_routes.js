const express = require('express');
const {signUp} = require('../controller/user_controller');
const {userValidators} = require('../helper/user_validation');

const router = express.Router();

router.post("/signup", userValidators, signUp);

module.exports = router;
