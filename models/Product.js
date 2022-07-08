const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title:{type:String, rquired:true, unique:true},
    description:{type:String, rquired:true},
    img:{type:String, rquired:true, unique:true},
    categories:{type:Array},
    size:{type:String},
    color:{type:String},
    price:{type:Number,required:true}
} ,  { timestamps:true}
);

module.exports = mongoose.model("Product",ProductSchema);