const express = require('express');
const { addProductReview, getProductReview } = require('../../controllers/shop/Review_controller');

const router = express.Router();

router.post('/addReview', addProductReview)
router.get('/getReview/:productId', getProductReview)



module.exports = router;