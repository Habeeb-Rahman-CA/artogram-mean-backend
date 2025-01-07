const express = require('express')
const router = express.Router()
const { checkout, getOrder, cancelOrder, deleteOrder } = require('../controller/orderController')
const { protect } = require('../middleware/authMiddleware')

router.route('/checkout').post(protect, checkout)
router.route('/').get(protect, getOrder)
router.route('/cancel').patch(protect, cancelOrder)
router.route('/:id').delete(protect, deleteOrder)

module.exports = router