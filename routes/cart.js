const {verifyToken} = require("../middleware/verifywebtoken");
const {verifyAdmin} = require('../middleware/admin')
const router = require("express").Router();
const Cart = require('../models/Cart');

router.post('/cart',[verifyToken], async(req,res)=>{
    const newCart = new Cart(req.body);

    try{
       const savedCart = await newCart.save()
       res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err.message)
    }
   
    
});

router.put('/:id',[verifyToken], async(req,res)=>{
    try {
      const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
          $set:req.body,
      },
      {new:true}
      )
      res.status(200).json(updatedCart);
  }catch(err){
      res.status(500).json(err);
  }

});


router.delete('/:id',[verifyToken] ,async(req,res)=>{

    try{
         await Cart.findByIdAndDelete(req.params.id);
         res.status(200).json("Product Deleted");
    }catch(err){
        res.status(500).json(err);
    }
 });

 router.get('/find/:userId',[verifyToken],async(req,res)=>{
   try{ const cart = await Cart.findOne({userId:req.params.userId});
    res.status(200).json(cart)
    }catch(err){
        res.status(501).json(err)
    }
 });

 router.get('/',[verifyToken,verifyAdmin],async(req,res)=>{
    try{
         const carts = await Cart.find();
         console.log(carts);
     res.status(200).json(carts)
     }catch(err){
         res.status(501).json(err.message)
     }
  });
 

module.exports = router;