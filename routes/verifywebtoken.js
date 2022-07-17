const jwt = require('jsonwebtoken');

const verifyToken =(req,res,next) =>{
const authHeader = req.headers.token;
if(authHeader){
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_KEY, (err, user)=>{
        console.log(user  )
        if(err) return res.status(403).json("JsonWeb Token is Invalid");
        // console.log(user)
        req.user = user;
        next();
    });
}else{
    return res.status(401).json("You are not authenticated")}
};

const verifyTokenAndAuthorization = async(req,res,next)=>{
    verifyToken(req,res,()=>{
        // console.log(req)
        if(req.user.id === req.params.id || req.user.isAdmin){
            
            next()
        }else{
res.status(403).json("Unauthorized User ,you are not allowed")
        }
    })
}

const verifyTokenAdmin = async(req,res,next)=>{
    verifyToken(req,res,()=>{
        // console.log(req)
        if(req.user.id === req.params.id || req.user.isAdmin){
            
            next()
        }else{
res.status(403).json("Unauthorized User ,you are not allowed")
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAdmin}