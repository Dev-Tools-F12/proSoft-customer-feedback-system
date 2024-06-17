const ApiKey = require('./../models/apiKey');

const apiKeyAuth = async (req, res, next) => 
{
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) 
  {
    return res.status(401).json({ message: 'API key is missing' });
  }

  try 
  {
    const key = await ApiKey.findOne({ key: apiKey });
    if (!key) 
    {
      return res.status(401).json({ message: 'Invalid API key' });
    }
    next();
  } catch (error) 
  {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = apiKeyAuth;
