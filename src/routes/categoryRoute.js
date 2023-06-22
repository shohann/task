const router = require('express').Router();
const { authorize } = require('../middlewares/auth')
const { createCategory, listCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')

const { upload } = require('../middlewares/uploadFile'); 
const { uploadToCloud } = require('../middlewares/uploadToCloud');

router.route('/')
      .post(authorize, upload, uploadToCloud, createCategory)
      .get(authorize, listCategory)

router.route('/:id')   
      .put(authorize, upload, uploadToCloud, updateCategory)
      .delete(authorize, deleteCategory)

module.exports = router;