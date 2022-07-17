const User = require("../models/User");
const {verifyTokenAndAuthorization} = require("../routes/verifywebtoken")
const router = require("express").Router();
const CryptoJS = require('crypto-js');


router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
   if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
   }
   try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedUser)
   }catch(err){
    res.status(500).json(err)
   }
});

router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted")
    }catch(err){
        res.status(500).json(err)
    }
  
});



module.exports = router;