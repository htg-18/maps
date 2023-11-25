const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
    unique: true,
  },
  itemQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  // Reference to User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
