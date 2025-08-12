const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
productId:String,
userId:String,
userName:String,
reviewMessage:String,
reviewValue:Number
},{timestamps:true})


const Review = mongoose.model('reviewSchema', reviewSchema);
module.exports = Review;