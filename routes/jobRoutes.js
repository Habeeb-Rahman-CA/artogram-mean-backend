const express = require('express')
const router = express.Router()
const { createJob, getJobByEmployer } = require('../controller/jobController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, createJob).get(protect, getJobByEmployer)

module.exports = router