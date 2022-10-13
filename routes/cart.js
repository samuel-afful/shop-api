const Cart = require('../models/Cart')
const router = require("express").Router();
const verifyToken = require('../middleware/verifywebtoken')

router.post('/cart',[verifyToken], async(req,res)=>{
    const newCart = Cart(req.body);

    try{
       const savedProduct = await newCart.save()
       res.status(200).json(savedProduct)
    }catch(err){
        res.status(500).json(err.message)
    }
   
    
})
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

router.get('/:userId',[verifyToken],async(res,req)=>{
   try{ 
    const cart = await Cart.findOne({userId:req.params.userId})
    res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/',[verifyToken,verifyAdmin],async(res,req)=>{
    try{ 
     const carts = await Cart.find();
     res.status(200).json(carts)
     }catch(err){
         res.status(500).json(err);
     }
 });
 


module.exports = router;