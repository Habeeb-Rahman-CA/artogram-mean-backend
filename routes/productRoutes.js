const express = require('express')
const router = express.Router()
const upload = require('../middleware/multerConfig')
const { createProduct, getAllProduct, getProductById, deleteProduct, updateProduct, getProductByUserId, uploadImage, getProductByArtistId } = require('../controller/productController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAllProduct).post(protect, createProduct)
router.route('/upload').post(protect, upload.single('img'), uploadImage)
router.route('/user').get(protect, getProductByUserId)
router.route('/:id').get(protect, getProductById).delete(protect, deleteProduct).put(protect, updateProduct)
router.route('/artist/:id').get(protect, getProductByArtistId)

module.exports = router