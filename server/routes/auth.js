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



// ROUTE :   Create a User using: POST '/createnewuser'.
router.post("/createnewuser",
    [
        body("username", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid Email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        let success = false;
        // if there are errors, return bad requests and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            // Destructure the required fields from req.body
            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt); // generating a secure password

            // creating a new user
            const user = await User.create({
                username,
                password: secPass,
                email,
            });

            await user.save();

            res.status(200).json({ success: true, message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);


module.exports = router;
