const express = require('express');
const { getFilterProducts, getProductbyid } = require('../../controllers/shop/Product_controllers');

const router = express.Router();

router.get('/getFilterProducts', getFilterProducts)
router.get('/getprofuctById/:id', getProductbyid)
module.exports = router;