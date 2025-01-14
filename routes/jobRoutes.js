const express = require('express')
const router = express.Router()
const { createJob, getJobByEmployer, closeJob, deleteJob } = require('../controller/jobController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, createJob).get(protect, getJobByEmployer)
router.route('/close').patch(protect, closeJob)
router.route('/:id').delete(protect, deleteJob)

module.exports = router