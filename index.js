const express = require("express");
const app = express();
var cors = require('cors')
const mongoose = require("mongoose");
var compression = require('compression');
const config = require("config")
var helmet = require("helmet");
const _env = app.get('env')
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const prodRouter = require('./routes/product');
const stripeRouter = require("./routes/stripe");
const dotenv = require("dotenv");
const path = require('path'); 
dotenv.config({ path: path.resolve(__dirname, '/.env') });

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors())

mongoose.connect(config.get('MONGO_URL'))
.then(()=>{
console.log("DB connected");
}).catch((err)=>{
    console.log(err);
});

//Routing
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/product',prodRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/stripe',stripeRouter);

port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(_env)
    console.log(`Listen on port ${port}`);
});