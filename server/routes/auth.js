const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Admin = require("../models/Admin");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // json web token , signing data with secret , make cookei

const JWT_SECRET = "whatadayboy";


router.post("/adminlogin", async (req, res) => {
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

         const passwordCompare = await bcrypt.compare(password, user.password);
        
         if (!passwordCompare) {
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

// route for login by user
router.post("/userlogin", async (req, res) => {
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

         const passwordCompare = await bcrypt.compare(password, user.password);
        
         if (!passwordCompare) {
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


router.post("/createnewuser",
  [
    body("username", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    body("phoneNo", "Phone number must be 10 digits").isLength({ min: 10, max: 10 }),
  ],
  async (req, res) => {
    let success = false;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Destructure the required fields from req.body
      const { username, email, password, phoneNo } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Generate a secure password hash
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      // Create a new user
      const user = new User({
        username,
        password: secPass,
        email,
        phoneNo,
      });

      await user.save();

      success = true;
      res.status(200).json({ success, message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);





// Get all users
router.get('/getallusers', async (req, res) => {
    try {
      const users = await User.find();
      res.json({ success: true, data: users });
    } catch (error) {
      console.error('Error getting users:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  });


module.exports = router;
