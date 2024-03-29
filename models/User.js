const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
const config = require("config")
const UserSchema = new mongoose.Schema({
    username:{type:String, require:true, unique:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true,},
    isAdmin:{
        type:Boolean,
        default:false
    },
} ,  { timestamps:true}
);
 UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id,isAdmin:this.isAdmin},config.get("TOKEN_KEY"),{expiresIn:"3d"});
    return token;
 }

module.exports = mongoose.model("User",UserSchema);