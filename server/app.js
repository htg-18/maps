const connectToMongo= require('./db');
const express = require('express');
const cors = require('cors');
const Admin = require("./models/Admin");
const User = require("./models/User");
connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

//Available Routes

app.post("/userlogin", async (req, res) => {
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

            
            if (user.password !=password) {
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

app.post("/adminlogin", async (req, res) => {
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

            
            if (user.password != password) {
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


app.listen(port,()=>{
    console.log(`Backend at port http://localhost:${port}`)
}) 


