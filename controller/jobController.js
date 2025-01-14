const Job = require('../models/jobModel')

// @route /api/job
// @desc create new jobs oppertunities
const createJob = async (req, res) => {
    ;
    const { title, companyName, description, jobType, category, numberOfOpening, salary, location } = req.body
    try {
        const job = new Job({ title, companyName, description, jobType, category, numberOfOpening, recruiter: req.user.id, salary, location })
        await job.save()
        res.status(200).json({ message: 'Created new product', job })
    } catch (err) {
        res.status(500).json({ message: 'failed to create the job', err: err.message })
    }
}

// @route /api/job
// @desc get all jobs oppertunities based on created employer
const getJobByEmployer = async (req, res) => {
    try {
        const job = await Job.find({ recruiter: req.user.id })
        res.status(200).json({ message: 'fetched successfully', job })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch user', err: err.message })
    }
}

// @route /api/job/:id
// @desc close the job oppertunities based on id
const closeJob = async (req, res) => {
    const { jobId } = req.body
    try {
        const job = await Job.findByIdAndUpdate(jobId, {
            status: 'Closed'
        }, { new: true })
        res.status(200).json({ message: 'Job closed successfully', job })
    } catch (err) {
        res.status(500).json({ message: 'failed to close the job', err: err.message })
    }
}

// @route /api/job/:id
// @desc close the job oppertunities based on id
const deleteJob = async(req,res) => {
    try {
        await Job.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Delete successfully'})
    } catch (err) {
        res.status(500).json({message: "failed to delete"})
    }
}

module.exports = { createJob, getJobByEmployer, closeJob, deleteJob }