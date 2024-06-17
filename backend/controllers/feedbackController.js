const Feedback = require('../models/feedbackModel');

// @route   POST /api/feedback
// @desc    Create new feedback
// @access  Public
const createFeedback = async (req, res) => 
{
  const { customerID, customerEmail, feedbackSubject, feedbackMessage } = req.body;

  try 
  {
    const newFeedback = new Feedback({
      customerID,
      customerEmail,
      feedbackSubject,
      feedbackMessage,
    });

    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) 
  {
    console.error(err);
    res.status(500).json({ message: 'Failed to create feedback' });
  }
};

// @route   GET /api/feedback
// @desc    Get all feedbacks
// @access  Public
const getAllFeedbacks = async (req, res) => 
{
  try 
  {
    const feedbacks = await Feedback.find().populate('customerID', 'username email');
    res.json(feedbacks);
  } catch (err) 
  {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve feedbacks' });
  }
};

// @route   GET /api/feedback/:id
// @desc    Get feedback by ID
// @access  Public
const getFeedbackById = async (req, res) => 
{
  const { id } = req.params;

  try 
  {
    const feedback = await Feedback.findById(id).populate('customerID', 'username email');
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (err) 
  {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve feedback' });
  }
};

// @route   PUT /api/feedback/:id
// @desc    Update feedback by ID
// @access  Public
const updateFeedback = async (req, res) => 
{
  const { id } = req.params;
  const { feedbackSubject, feedbackMessage, status, resolutionDateTime } = req.body;

  try 
  {
    const feedback = await Feedback.findById(id);
    if (!feedback) 
    {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    feedback.feedbackSubject = feedbackSubject || feedback.feedbackSubject;
    feedback.feedbackMessage = feedbackMessage || feedback.feedbackMessage;
    feedback.status = status || feedback.status;
    feedback.resolutionDateTime = resolutionDateTime || feedback.resolutionDateTime;

    await feedback.save();
    res.json(feedback);
  } catch (err) 
  {
    console.error(err);
    res.status(500).json({ message: 'Failed to update feedback' });
  }
};

// @route   DELETE /api/feedback/:id
// @desc    Delete feedback by ID
// @access  Public
const deleteFeedback = async (req, res) => 
{
  const { id } = req.params;

  try 
  {
    const feedback = await Feedback.findById(id);
    if (!feedback) 
    {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    await feedback.deleteOne();
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) 
  {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete feedback' });
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};
