const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authpath = require('./routes/auth');
const storespath = require('./routes/stores');
const { model } = require('mongoose');

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/', authpath);
app.use('/', storespath);
app.listen(port, () => {
  console.log(`Backend at port http://localhost:${port}`);
});


