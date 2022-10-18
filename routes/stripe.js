const router = require("express").Router()
const config = require("config")
const stripe = require('stripe')(config.get("STRIPE_SECRET_KEY"))

router.post("/payment",(req,res)=>{
    stripe.charges.create(
       { source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"},
       // {idempotencyKey:},
        (stripeErr,stripeRes)=>{
            if(stripeErr){
                res.status(500).json(stripeErr);
            }else{
                res.status(200).json(stripeRes);
            }
        }
    )
});

module.exports = router;