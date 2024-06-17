const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  customerID: { type: String, required: true },
  customerEmail: { type: String, required: true },
  feedbackDateTime: { type: Date, default: Date.now },
  feedbackSubject: { type: String, required: true },
  feedbackMessage: { type: String, required: true },
  status: { type: String, default: 'new' },
  resolutionDateTime: Date,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;