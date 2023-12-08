const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    unique:true,
    required: true,
  },
  
  itemId: {
    type: String,
    // required: true,
    // unique: true,
  },
  itemQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique:true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  requestStatus:{
    type: String,
    enum: ['pending', 'approved', 'rejected','discard'], 
  },
  requestedByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
