const express = require('express')
const router = express.Router()
const { addCart, getCartById } = require('../controller/cartController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, addCart).get(protect, getCartById)

module.exports = router