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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  requestStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  requestedByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
