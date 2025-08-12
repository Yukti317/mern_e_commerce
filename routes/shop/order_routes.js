const express = require("express");
const { CreateOrder, CaptureOrder, getOrderDetails, getAllorderbyUser } = require("../../controllers/shop/order_controller");

const router = express.Router();

router.post("/creatOrder", CreateOrder);
router.post("/captureOrder", CaptureOrder);
router.get("/getorderdetail/:Id", getOrderDetails);
router.get("/getAllorderbyUser/:userId", getAllorderbyUser);

module.exports = router;
