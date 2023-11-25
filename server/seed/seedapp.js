require('dotenv').config();
const Admin = require("../models/Admin");
const User = require("../models/User");
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URL;

const connectToMongo = async () => {
   try {
      await mongoose.connect(mongoURI);
    //   await mongoose.connect(mongoURI, {
    //      useNewUrlParser: true,
    //      useUnifiedTopology: true,
    //   });
      
      console.log('Connected to MongoDB');
   } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit the process with an error code
   }
}


// // Create a new admin user
// const newAdmin = new Admin({
//     username: 'admin',
//     password: 'password123',
//     email: 'admin@lnmiit.com',
//   });
  
//   // Save the admin user to the database
//   newAdmin.save()
//     .then(() => console.log('Admin user created successfully'))
//     .catch(err => console.error('Error creating admin user:', err.message));
  

// Create a new admin user
// const newUser = new User({
//     username: 'bh1',
//     password: 'password123',
//     email: 'bh1@lnmiit.com',
//   });
  
//   // Save the admin user to the database
//   newUser.save()
//     .then(() => console.log('Admin user created successfully'))
//     .catch(err => console.error('Error creating admin user:', err.message));
  



module.exports = connectToMongo;
