const express = require("express");
const { addAddress, fetchAddress, updateAddress, deleteAddress } = require("../../controllers/shop/Address_controller");



const router = express.Router();

router.post("/addAddress", addAddress);
router.get("/fetchAddress/:userId", fetchAddress);
router.put("/updateAddress/:userId/:addressId", updateAddress);
router.delete("/deleteAddress/:userId/:addressId", deleteAddress);

module.exports = router;
