const express = require('express');
const mongoDB = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const axios = require('axios');
const scrapperController = require('./controllers/scrapper');


const storage = multer.memoryStorage();
const upload = multer({ storage });

dotenv.config();
const app = express();
const port = process.env.PORT || 5000; 

// const userbase = require('./Routes/userdata');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-password'
//   }
// });

app.get("/mutualFund", scrapperController.scrapeMutualFunds);
app.get("/fixedDeposit", scrapperController.scrapeFixedDeposit);
app.get("/indianStockPrice", scrapperController.scrapeIndianStockPrice);
app.get("/usStockPrice", scrapperController.scrapeUSStockPrice);
// app.get("/stockIncrement", scrapperController.scrapeStockIncrement);

mongoDB();

app.use(cors());
app.use(express.json());

// app.use('/userbase', userbase);

app.listen(port, function () {
  console.log("Server Started at ", port);
});
