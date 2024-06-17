const Feedback = require('../models/feedbackModel');
const logger = require('../utils/logger');

const createFeedback = async (req, res) => 
{
  try 
  {
    const feedback = new Feedback(req.body);
    await feedback.save();
    logger.info('Feedback created', { id: feedback._id, customerID: feedback.customerID });
    res.status(201).send(feedback);
  } catch (error) 
  {
    logger.error(`Error creating feedback ${error.message}`, { error: error.message });
    res.status(400).send(error);
  }
};

const getAllFeedback = async (req, res) => 
{
  try 
  {
    const feedbacks = await Feedback.find();
    const recordCount = feedbacks.length
    logger.info(`Fetched ${recordCount} feedback/s`, { recordCount });
    res.status(200).send(feedbacks);
  } catch (error) 
  {
    logger.error(`Error fetching feedbacks ${error.message}`, { error: error.message });
    res.status(500).send(error);
  }
};

module.exports = 
{
  createFeedback,
  getAllFeedback
};
