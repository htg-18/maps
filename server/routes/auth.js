const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const JWT_SECRET = "whatadayboy";

router.post("/adminregister", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await Admin.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({ error: "User with this username or email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Admin({
      username,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await user.save();

    const data = {
      user: {
        id: user.id
      }
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ success: true, authtoken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/adminlogin", async (req, res) => {
  let success = false;

  const { username, password } = req.body;

  try {
    let user = await Admin.findOne({ username });

    if (!user) {
      success = false;
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      success = false;
      return res
        .status(400)
        .json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET); 
    success = true; 
    res.json({ success, authtoken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
