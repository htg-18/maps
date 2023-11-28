const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Inventory = require('../models/Inventory');

const uuid = require('uuid');
const nodemailer = require('nodemailer');

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
router.post('/requestforinventory', async (req, res) => {
    try {
      const { itemName, itemId, itemQuantity } = req.body;
      const userId = req.user._id; // Get the current user ID from the request
  
      const inventoryRequest = new Inventory({
        itemName,
        itemId,
        itemQuantity,
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
  router.get('/pendingrequestsuser', async (req, res) => {
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
router.get('/approvedrequestsuser', async (req, res) => {
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
router.get('/rejectedrequestsuser', async (req, res) => {
    try {
      const userId = req.user._id;
      const rejectedInventoryItems = await Inventory.find({ user: userId, requestStatus: 'rejected' });
      res.status(200).json({ success: true, data: rejectedInventoryItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  


// approve and reject inventory requests by admin
router.put('/handlerequests/:requestId', async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const action = req.body.action; // 'approve' or 'reject'
  
      const inventoryItem = await Inventory.findById(requestId);
  
      if (!inventoryItem) {
        return res.status(404).json({ message: 'Inventory request not found' });
      }
  
      if (action === 'approve') {
        inventoryItem.requestStatus = 'approved';
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