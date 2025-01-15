const { Job, HireReq } = require('../models/jobModel')

// @route POST /api/job
// @desc create new jobs oppertunities
const createJob = async (req, res) => {
    const { title, companyName, description, jobType, category, numberOfOpening, salary, location } = req.body
    try {
        const job = new Job({ title, companyName, description, jobType, category, numberOfOpening, recruiter: req.user.id, salary, location })
        await job.save()
        res.status(200).json({ message: 'Created new product', job })
    } catch (err) {
        res.status(500).json({ message: 'failed to create the job', err: err.message })
    }
}

// @route GET /api/job
// @desc get all jobs oppertunities based on created employer
const getJobByEmployer = async (req, res) => {
    try {
        const job = await Job.find({ recruiter: req.user.id })
        res.status(200).json({ message: 'fetched successfully', job })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch user', err: err.message })
    }
}

// @route GET /api/job/artist
// @desc get all jobs oppertunities
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate({path: 'recruiter', select: ['name', 'email']})
        res.status(200).json({message: 'fetched all the jobs', jobs})
    } catch (err) {
        res.status(500).json({message: 'failed to fetch', err: err.message})
    }
}

// @route PATCH /api/job/:id
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

// @route DELETE /api/job/:id
// @desc close the job oppertunities based on id
const deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Delete successfully' })
    } catch (err) {
        res.status(500).json({ message: "failed to delete" })
    }
}

// @route POST /api/job/hire/request
// @desc senting hire request from employer to artist
const hireRequest = async (req, res) => {
    const { hireJob, artistId } = req.body
    const { title, companyName, description, salary, location } = hireJob
    try {
        const newReq = new HireReq({ title, companyName, description, recruiter: req.user.id, artist: artistId, salary, location, })
        await newReq.save()
        res.status(200).json({ message: 'sented new hire request' })
    } catch (err) {
        res.status(500).json({ message: 'failed to sent the req', err: err.message })
    }
}

// @route GET /api/job/hire/request
// @desc get hire requests for artist
const getHireRequest = async (req, res) => {
    try {
        const hireReq = await HireReq.find({ artist: req.user.id, status: 'Pending' }).populate({ path: 'recruiter', select: ['name', 'email'] })
        res.status(200).json({ message: 'fetching all the hire reqs', hireReq })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch the hire req' })
    }
}

// @route GET /api/job/hire/response
// @desc get hire response for employer
const getHireResponse = async (req, res) => {
    try {
        const hireRes = await HireReq.find({ recruiter: req.user.id, status: { $ne: 'Pending' } }).populate({ path: 'artist', select: ['name', 'email', 'profilePic'] })
        res.status(200).json({ message: 'fetching all the responses from artist', hireRes })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch response', err: err.message })
    }
}

// @route POST /api/job/hire/response
// @desc sent hire response from artist to employer
const hireResponse = async (req, res) => {
    const { requestId, response } = req.body
    try {
        const hireReq = await HireReq.findById(requestId)
        hireReq.status = response
        await hireReq.save()
        res.status(200).json({ message: "Response sented successfully", hireReq })
    } catch (err) {
        res.status(500).json({ message: 'failed the to sent the hire response ' })
    }
}

module.exports = { createJob, getJobByEmployer, closeJob, deleteJob, hireRequest, getHireRequest, hireResponse, getHireResponse, getAllJobs }