const express = require('express')
const router = express.Router()
const { addAddress, getAddress } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')

router.route('/address').post(protect, addAddress).get(protect, getAddress)

module.exports = router