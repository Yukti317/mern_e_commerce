//BASIC SETUP 
const express = require('express');
require('./dbconnection/config') //db connection
require('dotenv').config()
const cookieparser = require('cookie-parser')
const cors = require('cors')
const authrouter = require('./routes/auth/auth_routes')
const adminProductroutes = require('./routes/admin/product_routes')
const adminOrderroutes = require('./routes/admin/order_routes')
const shopProductroutes = require('./routes/shop/product_routes')
const cartItemroutes =  require('./routes/shop/cart_routes')
const shopAddressroutes = require('./routes/shop/address_routes')
const shopOrderroutes = require('./routes/shop/order_routes')
const searchProducts = require('./routes/shop/search_routes')
const reviewProducts = require('./routes/shop/review_routes')

const app = express()
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization','Cache-Control', 'Expires','Pragma'],
    credentials : true
}));
app.use(cookieparser());
app.use('/api/auth', authrouter)
app.use('/api/admin/products', adminProductroutes)
app.use('/api/admin/orders', adminOrderroutes)
app.use('/api/shop/products', shopProductroutes)
app.use('/api/shop/cartItems', cartItemroutes)
app.use('/api/shop/address', shopAddressroutes)
app.use('/api/shop/order', shopOrderroutes)
app.use('/api/shop/search', searchProducts)
app.use('/api/shop/review', reviewProducts)
const port = process.env.Port || 5000
app.get("/", (req,res)=>{
    res.send("Node js code deployedd...")
})
app.listen(port)