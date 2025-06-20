const mongoose = require("mongoose");

const prductSchema = new mongoose.Schema({
    image:String,
    imagename:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    saleprice:Number,
    totalStock:Number
},{timestamps:true})

const Product = mongoose.model('Product', prductSchema);
module.exports = Product;