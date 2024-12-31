const express = require('express')
const router = express.Router()
const { createProduct, getAllProduct, getProductById } = require('../controller/productController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getAllProduct).post(protect, createProduct)
router.route('/:id').get(protect, getProductById).delete(protect, )

module.exports = router