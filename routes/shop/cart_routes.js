const express = require("express");
const { addToCart, fetchCartItems, upDateCart, deleteCart } = require("../../controllers/shop/Cart_controller");


const router = express.Router();

router.post("/addtocart", addToCart);
router.get("/fetchCart/:userId", fetchCartItems);
router.put("/updateCartitem", upDateCart);
router.delete("/deleteCartitem/:userId/:productId", deleteCart);
module.exports = router;
