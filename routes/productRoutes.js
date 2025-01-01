const express = require('express')
const router = express.Router()
const { createProduct, getAllProduct, getProductById, deleteProduct, updateProduct } = require('../controller/productController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAllProduct).post(protect, createProduct)
router.route('/:id').get(protect, getProductById).delete(protect, deleteProduct).put(protect, updateProduct)

module.exports = router