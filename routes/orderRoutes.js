const express = require('express')
const router = express.Router()
const { checkout, getOrder, cancelOrder, deleteOrder, getArtistOrder, getAllOrders, verifyPayment } = require('../controller/orderController')
const { protect } = require('../middleware/authMiddleware')

router.route('/checkout').post(protect, checkout)
router.route('/payment').patch(protect, verifyPayment)
router.route('/').get(protect, getOrder)
router.route('/cancel').patch(protect, cancelOrder)
router.route('/artist').get(protect, getArtistOrder)
router.route('/admin').get(protect, getAllOrders)
router.route('/:id').delete(protect, deleteOrder)

module.exports = router