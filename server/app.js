const connectToMongo= require('./db');
const express = require('express');
const cors = require('cors');
const Admin = require("./models/Admin");
const Inventory = require('./models/Inventory');
const User = require("./models/User");
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Make sure this line is present

//Available Routes

app.post("/userlogin", async (req, res) => {
       let success=false;
        // if there are errors, return bad requests and errors
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const { username, password } = req.body;
        try {
            let user = await User.findOne({ username });
            if (!user) {
                success:false
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }

            
            if (user.password !=password) {
                success=false;
                return res
                    .status(400)
                    .json({ success,error: "Please try to login with correct credentials" });
            }
          
            res.json({ message: 'Login successful' });
 
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

app.post("/adminlogin", async (req, res) => {
       let success=false;
        // if there are errors, return bad requests and errors
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const { username, password} = req.body;
        try {
            let user = await Admin.findOne({ username });
            if (!user) {
                success:false
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }

            
            if (user.password != password) {
                success=false;
                return res
                    .status(400)
                    .json({ success,error: "Please try to login with correct credentials " });
            }
          
            res.json({ message: 'Login successful' });
 
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//adding inventory to db after filling form of request to management
// Route to add items to the inventory
app.post('/additemsbymangement', async (req, res) => {
    const { itemName, itemQuantity,description} = req.body;
  
    try {
       // Check if an inventory item with the given name already exists
       let inventoryItem = await Inventory.findOne({ itemName });

       if (inventoryItem) {
           // If the item exists, update its quantity
           inventoryItem.itemQuantity += parseInt(itemQuantity, 10);
        } else {
           // If the item doesn't exist, create a new inventory item
           const itemId = uuid.v4();
           inventoryItem = new Inventory({
               itemName,
               itemId,
               itemQuantity: parseInt(itemQuantity, 10),
           });
       }

      // Save the inventory item
      await inventoryItem.save();
     
        // Send email using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kaizokuniorewanaru9@gmail.com',
                pass: 'hday cele tphe lgbc',
            },
        });

        const mailOptions = {
            from: 'kaizokuniorewanaru9@gmail.com',
            to: 'hs553608@gmail.com',
            subject: 'New Inventory Request',
            text: `Item: ${itemName}\nQuantity: ${itemQuantity}\nDescription: ${description}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

      res.status(201).json({ success: true, data: inventoryItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });



//api request to get all inventory , these items are not associated with any users
// Route to get all items not associated with any user
app.get('/allinventoryitems', async (req, res) => {
    try {
       // Find all inventory items where the user field is null
        const items = await Inventory.find({ user: null });
       res.status(200).json({ success: true, data: items });
    //    console.log(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



app.listen(port,()=>{
    console.log(`Backend at port http://localhost:${port}`)
}) 


