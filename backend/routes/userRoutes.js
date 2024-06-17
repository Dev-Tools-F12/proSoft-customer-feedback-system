const express = require('express');
const router = express.Router();
const {
    loginUser,
    deleteUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
} = require('../controllers/usersController');

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', loginUser);

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   GET /api/users/profile/:userId
// @desc    Get user profile by ID
// @access  Public
router.get('/profile/:userId', getUserProfile);

// @route   PUT /api/users/profile/:userId
// @desc    Update user profile by ID
// @access  Public
router.put('/profile/:userId', updateUserProfile);

// @route   DELETE /api/users/:userId
// @desc    Delete user by ID
// @access  Public (for demonstration; usually requires authentication)
router.delete('/:userId', deleteUser);

module.exports = router;
