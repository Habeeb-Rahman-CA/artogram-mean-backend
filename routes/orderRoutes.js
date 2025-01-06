const express = require('express')
const router = express.Router()
const { checkout } = require('../controller/orderController')
const { protect } = require('../middleware/authMiddleware')

router.route('/checkout').post(protect, checkout)

module.exports = router