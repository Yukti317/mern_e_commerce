//BASIC SETUP 
const express = require('express');
require('./dbconnection/config') //db connection
const cookieparser = require('cookie-parser')
const cors = require('cors')
const authrouter = require('./routes/auth/auth_routes')
const adminProductroutes = require('./routes/admin/product_routes')
const shopProductroutes = require('./routes/shop/product_routes')
const cartItemroutes =  require('./routes/shop/cart_routes')
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
app.use('/api/shop/products', shopProductroutes)
app.use('/api/shop/cartItems', cartItemroutes)
const port = process.env.Port || 5000
app.listen(port)