const jwt = require("jsonwebtoken"); 
const JWT_SECRET = "whatadayboy";

const fetchuser = (req,res,next)=>{
  const token = req.header('auth-token');
  if(!token){
      res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = { _id: data.user.id }; 
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
   
}

module.exports = fetchuser;