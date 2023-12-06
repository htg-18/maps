const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Inventory = require('../models/Inventory');

const uuid = require('uuid');
const nodemailer = require('nodemailer');
const fetchuser = require("../middleware/Fetchusers");
const fetchuserUsers = require("../middleware/FetchusersUser");

//adding inventory to db after filling form of request to management
// Route to add items to the inventory
router.post('/additemsbymangement', async (req, res) => {
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


// request for items by cart user
router.post('/additemsbyusercart', fetchuserUsers, async (req, res, next) => {
  const cartItems = req.body;
  const userId = req.user._id;

  try {
    const inventoryRequests = [];

    for (const [itemId, quantity] of Object.entries(cartItems)) {
      const inventoryItem = await Inventory.findOne({ _id: itemId });
        console.log(inventoryItem);
      const inventoryRequest = new Inventory({
        itemName: inventoryItem.itemName,
        // itemId: inventoryItem.itemId,
        itemId: uuid.v4(),
        itemQuantity: parseInt(quantity, 10),
        user: userId,
        requestStatus: 'pending',
        requestedByUser: userId,
        createdAt: Date.now(),
      });

      inventoryRequests.push(inventoryRequest);
    }

    await Promise.all(inventoryRequests.map((request) => request.save()));

    res.status(201).json({ success: true, message: 'Inventory items requested successfully' });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the error handler
  }
});




// add items by cart management
router.post('/additemsbymanagementcart', async (req, res) => {
  const cartItems = req.body;

  try {
    for (const [itemId, quantity] of Object.entries(cartItems)) {
      // Find the inventory item with the given ID
      // const inventoryItem = await Inventory.findOne({ _id: itemId });
      const inventoryItem = await Inventory.findOne({ _id: itemId });
     
      if (inventoryItem) {
        // Update the inventory item's quantity
        inventoryItem.itemQuantity += parseInt(quantity, 10);
        await inventoryItem.save();
      } else {
        // Create a new inventory item
        const newInventoryItem = new Inventory({
          _id: itemId,
          itemQuantity: parseInt(quantity, 10),
        });
        await newInventoryItem.save();
      }
    }

    // Send email notification
    const items = Object.keys(cartItems).map(async(itemId) => {
      const inventoryItem = await Inventory.findOne({ _id: itemId });
      return {
        itemName: inventoryItem.itemName,
        quantity: cartItems[itemId],
      };
    });

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
      subject: 'New Inventory Request from Cart',
      text: `Items:\n${items.map((item) => `${item.itemName}: ${item.quantity}`).join('\n')}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ success: true, message: 'Inventory items requested from management successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// new item entries by admin
router.post('/newitementries', async (req, res) => {
  const { itemName, itemQuantity,description} = req.body;
  
  try {
     // Check if an inventory item with the given name already exists who is genreal not under any user
     const inventoryItem = await Inventory.findOne({ itemName, user: null });

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
   
     
    res.status(201).json({ success: true, data: inventoryItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


//api request to get all inventory , these items are not associated with any users
// Route to get all items not associated with any user
router.get('/allinventoryitems', async (req, res) => {
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





//api request by user for the inventory request
router.post('/requestforinventory',fetchuser, async (req, res) => {
    try {
      const { itemName, itemQuantity,description } = req.body;
      const userId = req.user._id; // Get the current user ID from the request
      // console.log(userId);
      const itemId = uuid.v4();
         
      const inventoryRequest = new Inventory({
        itemName,
        itemId,
        itemQuantity: parseInt(itemQuantity, 10),
        user: userId,
        requestStatus: 'pending',
        requestedByUser: userId,
        createdAt: Date.now(), // Add the createdAt field
      });
   
       await inventoryRequest.save();
    
      res.status(200).json({ success: true, message: 'Inventory request submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  



//get pending requests for that particular user
  router.get('/pendingrequestsuser',fetchuser, async (req, res) => {
    try {
      const userId = req.user._id;
      const pendingRequests = await Inventory.find({ user: userId, requestStatus: 'pending' });
      res.status(200).json({ success: true, data: pendingRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

// get approved requests for particular user
router.get('/approvedrequestsuser',fetchuser, async (req, res) => {
    try {
      const userId = req.user._id;
      const approvedInventoryItems = await Inventory.find({ user: userId, requestStatus: 'approved' });
      res.status(200).json({ success: true, data: approvedInventoryItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

// get rejected requests for particular user
router.get('/rejectedrequestsuser',fetchuser, async (req, res) => {
    try {
      const userId = req.user._id;
      const rejectedInventoryItems = await Inventory.find({ user: userId, requestStatus: 'rejected' });
      res.status(200).json({ success: true, data: rejectedInventoryItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  

// Separate function to remove approved request
async function removeApprovedRequest(requestId) {
  try {
    const inventoryItem = await Inventory.findOne({ _id: requestId });

    if (inventoryItem && inventoryItem.requestStatus === 'approved') {
      await inventoryItem.remove(); // Remove the approved request
    }
  } catch (error) {
    console.error(error);
  }
}

// approve and reject inventory requests by admin
router.put('/handlerequests/:requestId', async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const action = req.body.action; // 'approve' or 'reject'
  
      // const inventoryItem = await Inventory.findById(requestId);
      const inventoryItem = await Inventory.findOne({ _id: requestId });

      if (!inventoryItem) {
        return res.status(404).json({ message: 'Inventory request not found' });
      }
    
      if (action === 'approve') {
        // find if inventory already exists for this request,
        const existingInventoryItem = await Inventory.findOne({ itemName: inventoryItem.itemName, user: inventoryItem.user,requestStatus:"approved" });

        const admininventory = await Inventory.findOne({ itemName: inventoryItem.itemName, user: null });
        console.log(admininventory);
        if (existingInventoryItem) {
          existingInventoryItem.itemQuantity += parseInt(inventoryItem.itemQuantity,10);
          admininventory.itemQuantity -= parseInt(inventoryItem.itemQuantity, 10);
           console.log('existing');
          inventoryItem.requestStatus = 'discard';
          await existingInventoryItem.save();
          await admininventory.save();
          await removeApprovedRequest(requestId);  // calling function to Delete the approved request since the item is already in inventory
        } else {
          inventoryItem.requestStatus = 'approved';
          admininventory.itemQuantity -= parseInt(inventoryItem.itemQuantity, 10);
          await admininventory.save();
        }
      } else if (action === 'reject') {
        inventoryItem.requestStatus = 'rejected';
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }
      
     
      await inventoryItem.save();
  
      res.status(200).json({ success: true, message: 'Inventory request updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

// get all pending requests for admin
router.get('/allpendingrequests', async (req, res) => {
    try {
      const allRequests = await Inventory.find({ requestStatus: 'pending' });
      res.status(200).json({ success: true, data: allRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

//Get all rejected requests for admin:
router.get('/allrejectedrequests', async (req, res) => {
    try {
      const allRejectedRequests = await Inventory.find({ requestStatus: 'rejected' });
      res.status(200).json({ success: true, data: allRejectedRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
//Get all approved requests for admin:
router.get('/allapproverequests', async (req, res) => {
    try {
      const allApprovedRequests = await Inventory.find({ requestStatus: 'approved' });
      res.status(200).json({ success: true, data: allApprovedRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  



module.exports = router;