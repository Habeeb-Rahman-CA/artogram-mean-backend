const express = require('express')
const router = express.Router()
const { createJob, getJobByEmployer, closeJob, deleteJob, hireRequest, getHireRequest, hireResponse, getHireResponse, getAllJobs } = require('../controller/jobController')
const { protect } = require('../middleware/authMiddleware')

//Jobs Routes
/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management APIs
 */

/**
 * @swagger
 * /api/job:
 *   post:
 *     summary: Create a new job opportunity
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Creates a new job opportunity.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - companyName
 *               - description
 *               - jobType
 *               - category
 *               - numberOfOpening
 *               - salary
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *                 description: Job title
 *               companyName:
 *                 type: string
 *                 description: Name of the company
 *               description:
 *                 type: string
 *                 description: Job description
 *               jobType:
 *                 type: string
 *                 description: Type of job (e.g., full-time, part-time)
 *               category:
 *                 type: string
 *                 description: Job category
 *               numberOfOpening:
 *                 type: number
 *                 description: Number of openings
 *               salary:
 *                 type: number
 *                 description: Salary for the job
 *               location:
 *                 type: string
 *                 description: Job location
 *     responses:
 *       200:
 *         description: Job created successfully
 *       500:
 *         description: Failed to create the job
 */
/**
 * @swagger
 * /api/job:
 *   get:
 *     summary: Get all job opportunities created by the employer
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Fetches all job opportunities created by the logged-in employer.
 *     responses:
 *       200:
 *         description: Fetched successfully
 *       500:
 *         description: Failed to fetch jobs
 */
router.route('/').post(protect, createJob).get(protect, getJobByEmployer)

/**
 * @swagger
 * /api/job/artist:
 *   get:
 *     summary: Get all job opportunities
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Fetches all job opportunities available.
 *     responses:
 *       200:
 *         description: Fetched all jobs successfully
 *       500:
 *         description: Failed to fetch jobs
 */
router.route('/artist').get(protect, getAllJobs)

/**
 * @swagger
 * /api/job/close:
 *   patch:
 *     summary: Close a job opportunity
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Closes a job opportunity based on job ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *             properties:
 *               jobId:
 *                 type: string
 *                 description: ID of the job to be closed
 *     responses:
 *       200:
 *         description: Job closed successfully
 *       500:
 *         description: Failed to close the job
 */
router.route('/close').patch(protect, closeJob)

/**
 * @swagger
 * /api/job/{id}:
 *   delete:
 *     summary: Delete a job opportunity
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Deletes a job opportunity by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       500:
 *         description: Failed to delete the job
 */
router.route('/:id').delete(protect, deleteJob)
//Job Hire Routes
/**
 * @swagger
 * /api/job/hire/request:
 *   post:
 *     summary: Send a hire request
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Sends a hire request from an employer to an artist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hireJob
 *               - artistId
 *             properties:
 *               hireJob:
 *                 type: object
 *                 description: Job details
 *               artistId:
 *                 type: string
 *                 description: ID of the artist
 *     responses:
 *       200:
 *         description: Hire request sent successfully
 *       500:
 *         description: Failed to send the request
 */
/**
 * @swagger
 * /api/job/hire/request:
 *   get:
 *     summary: Get hire requests for an artist
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Fetches hire requests for the logged-in artist.
 *     responses:
 *       200:
 *         description: Fetched all hire requests
 *       500:
 *         description: Failed to fetch hire requests
 */
router.route('/hire/request').post(protect, hireRequest).get(protect, getHireRequest)

/**
 * @swagger
 * /api/job/hire/response:
 *   post:
 *     summary: Send a hire response
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Sends a hire response from an artist to an employer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requestId
 *               - response
 *             properties:
 *               requestId:
 *                 type: string
 *                 description: Hire request ID
 *               response:
 *                 type: string
 *                 description: Response from the artist (Accepted/Rejected)
 *     responses:
 *       200:
 *         description: Response sent successfully
 *       500:
 *         description: Failed to send the response
 */
/**
 * @swagger
 * /api/job/hire/response:
 *   get:
 *     summary: Get hire responses for an artist
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Fetches hire reponses for the logged-in artist.
 *     responses:
 *       200:
 *         description: Fetched all hire responses
 *       500:
 *         description: Failed to fetch hire responses
 */
router.route('/hire/response').post(protect, hireResponse).get(protect, getHireResponse)

module.exports = router