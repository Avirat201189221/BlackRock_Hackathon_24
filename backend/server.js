const express = require('express');
const mongoDB = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage });

dotenv.config();
const app = express();
const port = process.env.PORT || 5000; 

const scrapeRoutes = require('./routes/scrape_routes')
const userbase = require('./routes/user_routes');

mongoDB();

app.use(cors());
app.use(express.json());

app.use('/userbase', userbase);
app.use('/scrape', scrapeRoutes);

app.listen(port, function () {
  console.log("Server Started at ", port);
});
