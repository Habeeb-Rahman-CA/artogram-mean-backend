const express = require('express')
const router = express.Router()
const { addCart, getCartByUserId, deleteCartItem,  } = require('../controller/cartController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, addCart)
router.route('/:id').get(protect, getCartByUserId)
router.route('/:cartId/products/:productId').delete(protect, deleteCartItem)

module.exports = router