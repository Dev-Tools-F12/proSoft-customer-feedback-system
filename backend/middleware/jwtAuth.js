const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();

const API_KEY = process.env.API_KEY;

const authenticateAPIKey = (req, res, next) => 
{
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) 
  {
    return res.status(403).json({ message: 'API key is missing or invalid' });
  }
  next();
};


const authenticateToken = (req, res, next) => 
{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token is missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => 
  {
    if (err) return res.status(403).json({ message: 'Token is invalid' });
    req.user = user;
    next();
  });
};


const jwtAuth = async (req, res, next) => 
{
  const token = req.headers['authorization'];
  if (!token) 
  {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try 
  {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) 
    {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//module.exports = jwtAuth;
module.exports = { authenticateAPIKey, authenticateToken };
