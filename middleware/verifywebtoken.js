const jwt = require('jsonwebtoken');

const verifyToken = function(req,res,next){
const token = req.header('x-auth-token')
if(!token) return res.status(401).send("Access Denied, No Token Provided");
try{
    const decoded = jwt.verify(token, config.get("TOKEN_KEY"));
    req.user = decoded ;
    next();
}  
    catch(err){
        res.status(401).send('Invalid Token')
    }
}


module.exports = {verifyToken}