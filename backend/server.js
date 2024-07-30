const express = require('express');
const mongoDB = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');


const storage = multer.memoryStorage();
const upload = multer({ storage });

dotenv.config();
const app = express();
const port = process.env.PORT || 5000; 

const userbase = require('./Routes/userdata');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
  }
});

mongoDB();

app.use(cors());
app.use(express.json());

app.use('/userbase', userbase);

app.listen(port, function () {
  console.log("Server Started at ", port);
});
