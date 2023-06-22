const router = require('express').Router();
const { authorize } = require('../middlewares/auth')
const { createProduct, listProduct, updateProduct, deleteProduct } = require('../controllers/productController')

const { upload } = require('../middlewares/uploadFile'); 
const { uploadToCloud } = require('../middlewares/uploadToCloud');

router.route('/')
      .post(authorize, upload, uploadToCloud, createProduct)
      .get(authorize, listProduct)

router.route('/:id')   
      .put(authorize, upload, uploadToCloud, updateProduct)
      .delete(authorize, deleteProduct)

module.exports = router;