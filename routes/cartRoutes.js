const express = require('express')
const router = express.Router()
const { addCart } = require('../controller/cartController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, addCart)

module.exports = router