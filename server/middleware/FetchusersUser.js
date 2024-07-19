const jwt = require("jsonwebtoken"); 
const JWT_SECRET = "whatadayboy";

const fetchuserUsers = (req,res,next)=>{
  const token = req.header('token');
  if(!token){
      res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = { _id: data.user.id }; 
        console.log('token :'+ token);       
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
   
}

module.exports = fetchuserUsers;






// middleware
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = "whatadayboy";

// const fetchuser = (req, res, next) => {
//   const token = req.header('auth-token');

//   if (!token) {
//     return res.status(401).json({ error: "Please authenticate using a valid token" });
//   }

//   try {
//     const data = jwt.verify(token, JWT_SECRET);
//     req.user = { _id: data.user.id }; // Extract the user ID
//     next(); // Continue with the request
//   } catch (error) {
//     return next(error); // Pass the error to the next middleware
//   }
// };

// module.exports = fetchuser;
