const connectToMongo= require('./db');
const express = require('express');
const cors = require('cors');


const bodyParser = require('body-parser');
const authpath = require('./routes/auth');
const inventorypath = require('./routes/inventory');
connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Make sure this line is present

//Available Routes



// authpath have routes of
//  post - '/adminlogin' - login by admin
//  post - '/userlogin'  - login by user
//  post -  '/createnewuser' - new user created by admin
//  get -   '/getallusers'  - get all users 
//  put -    '/edituser/:username'  - editing user details corresponding to username
app.use('/',authpath);


//inventorypath have routes of 
// post - '/additemsbymangement' - add items by management
// get - '/allinventoryitems'  -Route to get all items not associated with any user
app.use('/',inventorypath);

app.listen(port,()=>{
    console.log(`Backend at port http://localhost:${port}`)
}) 


