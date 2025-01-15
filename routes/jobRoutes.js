const express = require('express')
const router = express.Router()
const { createJob, getJobByEmployer, closeJob, deleteJob, hireRequest, getHireRequest, hireResponse } = require('../controller/jobController')
const { protect } = require('../middleware/authMiddleware')

//Jobs Routes
router.route('/').post(protect, createJob).get(protect, getJobByEmployer)
router.route('/close').patch(protect, closeJob)
router.route('/:id').delete(protect, deleteJob)
//Job Hire Routes
router.route('/hire/request').post(protect, hireRequest).get(protect, getHireRequest)
router.route('/hire/response').post(protect, hireResponse)

module.exports = router