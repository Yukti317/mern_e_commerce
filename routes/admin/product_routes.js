const express = require('express');
const { handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct, fetchProductbyid } = require('../../controllers/admin/product_controler');
const { upload } = require('../../helpers/cloudinery');

const router = express.Router();

router.post('/uploadproductimage', upload.single('my_file'), handleImageUpload)
router.post('/addProduct', addProduct)
router.get('/getProduct', fetchAllProduct)
router.put('/updateProduct/:id', editProduct)
router.delete('/deleteProduct/:id',deleteProduct)
router.get('/getProductbyid/:id',fetchProductbyid)

module.exports = router;