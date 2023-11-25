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
    min: 0,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    default: null, // Initially assigned to admin
  },
});

module.exports = mongoose.model('Inventory', inventorySchema);
