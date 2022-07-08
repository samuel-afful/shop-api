const express = require("express");
const app = express()
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json())



mongoose.connect(process.env.MONGO_URL)
.then(()=>{
console.log("DB connected")
}).catch((err)=>{
    console.log(err)
});

//Routing
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)



port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Listen on port ${port}`)
})