const {verifyToken} = require("../middleware/verifywebtoken");
const {verifyAdmin} = require("../middleware/admin");
const router = require("express").Router();
const Product = require('../models/Product');



router.post('/products', async(req,res)=>{
        const newProduct = new Product(req.body);

        try{
           const savedProduct = await newProduct.save()
           res.status(200).json(savedProduct)
        }catch(err){
            res.status(500).json(err.message)
        }
       
        
})
 router.put('/:id',[verifyToken,verifyAdmin], async(req,res)=>{
          try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },
            {new:true}
            )
            res.status(200).json(updatedProduct);
        }catch(err){
            res.status(500).json(err);
        }

 });

 router.delete('/:id',[verifyToken,verifyAdmin] ,async(req,res)=>{

    try{
         await Product.findByIdAndDelete(req.params.id);
         res.status(200).json("Product Deleted");
    }catch(err){
        res.status(500).json(err);
    }
 });

 router.get('/',[verifyToken,verifyAdmin],async(req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
      try { 
        let product;
       if(qNew){
         product = await Product.find().sort({createdAt:-1}).limit(5);
       }else if(qCategory){
        product = await Product.find({categories:{
            $in:[qCategory],
        }});
       }else{
        product = await Product.find();
       }
       res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
 });


module.exports = router;