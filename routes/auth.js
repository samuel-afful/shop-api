const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require('crypto-js')
const config = require("config")

//REGISTER
router.post("/register", async(req,res)=>{
    const user = await User.findOne({username:req.body.username});
    const email = await User.findOne({email:req.body.email})
    if(email) { return res.status(201).json("email already exist")}
    else if(user)  {return res.status(201).json("username already exist")}
    const newUser = User({
        username:req.body.username,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,config.get("SECRET_KEY")).toString()
    });
    try{
        const savedUser =  await newUser.save();
        const token = savedUser.generateAuthToken()
        res.setHeader('x-auth-token',token).status(201).json(savedUser);
    }catch(err){
        
        res.status(201).json( err );
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
    const hashedPassword  = CryptoJS.AES.decrypt(user.password, config.get("SECRET_KEY"));
    const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalpassword !== req.body.password ) return res.status(201).json("Wrong Credentials");   
       const token = user.generateAuthToken();
       const {password, ...others} = user._doc
      res.status(200).json({others,token});
}catch(err){
      res.status(501).json(err);
}
});




module.exports = router;