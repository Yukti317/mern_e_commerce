const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: String,
    address:String,
    city:String,
    pincode:String,
    phone:String,
    notes:String
},{timestamps:true})

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;