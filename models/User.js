const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true,},
    isAdmin:{
        type:Boolean,
        default:false
    },
} ,  { timestamps:true}
);
 UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.TOKEN_KEY,{expiresIn:"3d"});
    return token;
 }

module.exports = mongoose.model("User",UserSchema);