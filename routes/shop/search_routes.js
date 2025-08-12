const express = require('express');
const { SearchProduct } = require('../../controllers/shop/Search_controllers');

const router = express.Router();

router.get('/:keyword', SearchProduct)



module.exports = router;