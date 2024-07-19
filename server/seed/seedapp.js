require('dotenv').config();
// const Admin = require("../models/Admin");
// const User = require("../models/User");
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URL;

const connectToMongo = async () => {
   try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB');
   } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); 
   }
}
module.exports = connectToMongo;
