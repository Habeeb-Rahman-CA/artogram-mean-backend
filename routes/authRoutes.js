const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controller/authController')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: Creates a new user with hashed password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Something went wrong
 */
router.route('/register').post(register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Login failed
 */
router.route('/login').post(login)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     description: Clears the authentication token cookie.
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.route('/logout').post(logout)

module.exports = router