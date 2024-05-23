const jwt = require("jsonwebtoken");

const verifyJWT = (req,res,next)=>{

    const authHeader = req.headers.authorization || req.headers.Authorization //"Bearer token"
    if(!authHeader?.startsWith("Bearer")){
        return res.status(401).json({message :"Unauthorized "});

    }
    const token = authHeader.split(" ")[1] // ["Bearer","token"]

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.status(403).jso,({message: "Forbidden"})
        req.user = decoded.UserInfo.id;
        next()
    })
 } 

/*
const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt; // Assuming the token is stored in a cookie named "accessToken"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decodedToken = jwt.decode(token , { complete: true });
 // console.log(decodedToken.payload.UserInfo.id);

  req.user = decodedToken.payload.UserInfo.id;
  next();
};*/

module.exports = verifyJWT;
