const bcrypt = require('bcryptjs');
const User = require('../models/user');
const logger = require('../utils/logger');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
const registerUser = async (req, res) => 
{
  const { username, email, password } = req.body;
  try 
  {
    // Check if user exists
    let existingUser = await User.findOne({ email });
    if (existingUser) 
    {
        logger.error(`User already exists`, { email: email });
        return res.status(400).json({ message: 'Error User already exist' });
    }

    // Check if username not taken
    let existingUserName = await User.findOne({ username });
    if (existingUserName) 
    {
        logger.error(`User name already taken`, { existingUserName: existingUserName });
        return res.status(400).json({ message: 'User name already taken' });
    }

    // Create new user
    const newUser = new User
    ({
        username,
        email,
        password,
    });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    logger.info('User registered successfully', { id: newUser._id, username : newUser.username });

  } catch (err) 
  {
    logger.error(`${err.message}`, { error: err.message });
    res.status(500).json({ message: 'Failed to register user' });
  }
};

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
const loginUser = async (req, res) => 
{
  const { email, password } = req.body;

  try 
  {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) 
    {
        logger.error(`Invalid user`, { email: email });
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
    {
        logger.error(`Incorrect user pasword`, { id: user._id });
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
    logger.info(`Login successful`, { id: user._id });

  } catch (err)
  {
    logger.error(`${err.message}`, { error: err.message });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Public
const getUserProfile = async (req, res) => 
{
  const { userId } = req.params;
  try 
  {
    const user = await User.findById(userId);
    if (!user) 
    {
        logger.error(`User not found`, { id: user});
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
    logger.info(`Get user profile details`, { id: user});

  } catch (err) 
  {
    logger.error(`${err.message}`, { error: err.message });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @route   PUT /api/users/:userId
// @desc    Update user profile
// @access  Public
const updateUserProfile = async (req, res) => 
{
  const { userId } = req.params;
  const { username, email, password } = req.body;

  try 
  {
    const user = await User.findById(userId);
    if (!user) 
    {
        logger.error(`User not found`, { id: user});
        return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.username = username || user.username;
    user.email = email || user.email;

    if (password) 
    {
      // Hash new password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: 'User profile updated successfully' });
  } catch (err) 
  {
    logger.error(`${err.message}`, { error: err.message });
    res.status(500).json({ message: 'Failed to update user profile' });
  }
};

// @route   DELETE /api/users/:userId
// @desc    Delete user by ID
// @access  Public (for demonstration; usually requires authentication)
const deleteUser = async (req, res) => 
{
    const { userId } = req.params;
    try 
    {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) 
        {
            logger.error(`User not found`, { id: user});
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete user from database
        await User.findByIdAndDelete(userId);
        logger.info(`User profile udate deleted successfully`, { id: user});

        res.json({ message: 'User deleted successfully' });
    } catch (err) 
    {
        logger.error(`${err.message}`, { error: err.message });
        res.status(500).json({ message: 'Failed to delete user' });
    }
};
  
module.exports = 
{
  loginUser,
  deleteUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
};
