
const {verifyToken} = require("../middleware/verifywebtoken");
const {verifyAdmin} = require('../middleware/admin')
const router = require("express").Router();
const Order = require('../models/Order');


router.post('/order',[verifyToken], async(req,res)=>{
    const newOrder = new Order(req.body);

    try{
       const savedOrder = await newOrder.save()
       res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err.message)
    }
   
    
});

router.get('/find/:userId',[verifyToken],async(req,res)=>{
    try{ const order = await Order.find({userId: req.params.userId});
     res.status(200).json(order)
     }catch(err){
         res.status(501).json(err)
     }
  });
 
  router.put('/:id',[verifyToken,verifyAdmin], async(req,res)=>{
    try {
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
          $set:req.body,
      },
      {new:true}
      )
      res.status(200).json(updatedOrder);
  }catch(err){
      res.status(500).json(err);
  }

});

router.delete('/:id',[verifyToken,verifyAdmin] ,async(req,res)=>{

    try{
         await Order.findByIdAndDelete(req.params.id);
         res.status(200).json("Product Deleted");
    }catch(err){
        res.status(500).json(err);
    }
 });


  router.get('/',[verifyToken,verifyAdmin],async(req,res)=>{
    try{
     const order = await Order.find();
     res.status(200).json(order)
     }catch(err){
         res.status(501).json(err)
     }
  });
 

  router.get('/income', async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1)) ;
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1)); 
 
        const income =  await Order.aggregate([
        {
            $match:{createdAt:{$gte:previousMonth}}
        },
        {
            $project:{
                month:{$month:"$createdAt"},
                sales:"$amount"
            },
        },
        {
            $group:{
                _id: "$month",
                total:{$sum: "$sales"}
            }
        }
    ]);
        console.log(income)
        res.status(200).json(income)
    
  });


module.exports = router;