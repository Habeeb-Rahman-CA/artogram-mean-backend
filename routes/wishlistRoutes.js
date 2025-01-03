const express = require('express')
const router = express.Router()
const { getWishlist, addWishlist, deleteWishlist } = require('../controller/wishlistController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, addWishlist)
router.route('/:id').get(protect, getWishlist)
router.route('/:wishlistId/products/:productId').delete(protect, deleteWishlist)

module.exports = router