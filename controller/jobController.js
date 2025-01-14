const Job = require('../models/jobModel')

// @route /api/job
// @desc create new jobs oppertunities
const createJob = async (req, res) => {
    const { title, companyName, description, jobType, category, numberOfOpening, salary, location } = req.body
    try {
        const job = new Job({ title, companyName, description, jobType, category, numberOfOpening, recruiter: req.user.id, salary, location, status: 'Open', postedDate, deadlineDate })
        await job.save()
        res.status(200).json({ message: 'Created new product', job })
    } catch (err) {
        res.status(500).json({ message: 'failed to create the job' })
    }
}

// @route /api/job
// @desc get all jobs oppertunities based on created employer
const getJobByEmployer = async (req, res) => {
    try {
        const job = await Job.find({ recruiter: req.user.id }).populate({ path: 'recruiter', select: ['name', 'email'] })
        res.status(200).json({ message: 'fetched successfully', job })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch user' })
    }
}

module.exports = { createJob, getJobByEmployer }