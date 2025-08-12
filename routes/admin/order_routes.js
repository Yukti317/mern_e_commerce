const express = require('express');
const { getAllorder, getAllOrderDetails, updateOrderStatus } = require('../../controllers/admin/order_controler');


const router = express.Router();


router.get('/getAllOrder', getAllorder)
router.get('/getAllOrderDetails/:Id', getAllOrderDetails)
router.put('/updateOrderstatus/:Id', updateOrderStatus)


module.exports = router;