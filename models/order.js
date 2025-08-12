const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    
    razorpayOrderId:String,
    userId:String,
    cartId:String,
    cartItems:[{
         productId:String,
         title:String,
         image:String,
         price:String,
         saleprice:String,
         quantity:String
    }],
    addressInfo:{
        addressId:String,
        address:String,
        city:String,
        pincode:String,
        phone:String,
        notes:String
    },
    orderStatus:String,
    paymentMethod:String,
    paymentStatus:String,
    paymentId:String,
    payerId:String,
    totalAmount:Number,
    orderDate:Date,
    orderUpdateDate:Date,
},{timestamps:true})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;