const User = require("../models/User");
const {verifyToken} = require("../middleware/verifywebtoken")
const {verifyAdmin} = require("../middleware/admin")
const router = require("express").Router();
const CryptoJS = require('crypto-js');
const config = require("config")


router.put("/:id",verifyToken,async(req,res)=>{
   if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(req.body.password,config.get("SECRET_KEY")).toString()
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

router.delete("/:id", verifyToken, async(req,res)=>{
    try{
      await User.findByIdAndDelete(req.params.id);
        const {others} = user._doc
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err)
    }
  
});

router.get("/find/:id", [verifyToken,verifyAdmin], async(req,res)=>{
    try{
       const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err)
    }
  
});

router.get("/",[verifyToken,verifyAdmin], async(req,res)=>{
     const qCustomer = req.query.new
    try{
       const users = qCustomer ?  await User.find().sort({ _id:-1}).limit(10) : await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err)
    }
  
});

router.get("/stats", [verifyToken,verifyAdmin],async (req,res)=>{
    const date =new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try{
        const data = await User.aggregate([
            {$match:{createdAt: {$gte:lastYear}}},
            {
                $project: {
                    month:{$month: "$createdAt"},
                },
            },
            {
                $group:{
                    _id: "$month",
                    total:{$sum: 1}
                }
            }
        ]);
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;