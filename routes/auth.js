const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require('crypto-js')
var jwt = require('jsonwebtoken');

//REGISTER
router.post("/register", async(req,res)=>{
    const newUser = User({
        username:req.body.username,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
    });
    try{
        const savedUser =  await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(201).json(err);
    }
   
});

//LOGIN
router.post('/login',async(req,res)=>{
  try{ 
    //find the user by filtering his name
     const user = await User.findOne({username:req.body.username});
    if(!user) return res.status(201).json("Wrong Credentials");
    //takes the user password from database from matched username
    //Decrypting password and matching with plain password input
    const hashedPassword  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalpassword !== req.body.password ) return res.status(201).json("Wrong Credentials");   
       const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.TOKEN_KEY,{expiresIn:"3d"});
       const {password, ...others} = user
      res.status(200).json({others,token});
}catch(err){
      res.status(501).json(err);
}
});




module.exports = router;