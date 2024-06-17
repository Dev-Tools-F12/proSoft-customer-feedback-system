const express = require('express');
const router = express.Router();
const {
    loginUser,
    deleteUser,
    registerUser,
    generateApiKey,
    getUserProfile,
    updateUserProfile,
} = require('../controllers/usersController');

// const jwtAuth = require('../middleware/jwtAuth');
// const adminAuth = require('../middleware/adminAuth');
const { authenticateAPIKey, authenticateToken } = require('../middleware/jwtAuth');

router.use(authenticateAPIKey);


/**
 * @swagger
 * tags:
 *   name: Users Profile
 *   description: User Profiles API Calls
 */

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     description: Login a user with their credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', loginUser);

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with username, email, and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/register', registerUser);

// @route   GET /api/users/profile/:userId
// @desc    Get user profile by ID
// @access  Public
/**
 * @swagger
 * /users/profile/{userId}:
 *   get:
 *     summary: Get user profile by ID
 *     description: Retrieve user profile information by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/profile/:userId',authenticateToken , getUserProfile);

// @route   PUT /api/users/profile/:userId
// @desc    Update user profile by ID
// @access  Public
/**
 * @swagger
 * /users/profile/{userId}:
 *   put:
 *     summary: Update user profile by ID
 *     description: Update user profile information by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/profile/:userId', authenticateToken , updateUserProfile);

// @route   DELETE /api/users/:userId
// @desc    Delete user by ID
// @access  Public (for demonstration; usually requires authentication)
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:userId', authenticateToken , deleteUser);

// router.post('profile/generateApiKey', authenticateToken , adminAuth, generateApiKey);

module.exports = router;
