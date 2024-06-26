const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');
const feedbackController = require('../controllers/feedbackController');

const { authenticateAPIKey, authenticateToken } = require('../middleware/jwtAuth');

router.use(authenticateAPIKey);
/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Feedback Management API Calls
 */

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Create new feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerID:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               feedbackSubject:
 *                 type: string
 *               feedbackMessage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/feedback', createFeedback);

/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get all feedbacks
 *     responses:
 *          200:
 *            description: A list of feedbacks
 *            content:
 *            application/json:
 *            schema:
 *            type: array
 *          500:
 *             description: Internal server error
 */
router.get('/feedback', getAllFeedbacks);

/**
 * @swagger
 * /feedback/{id}:
 *   get:
 *     summary: Get feedback by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feedback ID
 *     responses:
 *       200:
 *         description: Feedback retrieved successfully
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Internal server error
 */
router.get('/feedback/:id', getFeedbackById);

/**
 * @swagger
 * /feedback/{id}:
 *   put:
 *     summary: Update feedback by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feedback ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedbackSubject:
 *                 type: string
 *               feedbackMessage:
 *                 type: string
 *               status:
 *                 type: string
 *               resolutionDateTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Feedback updated successfully
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Internal server error
 */
router.put('/feedback/:id', updateFeedback);

/**
 * @swagger
 * /feedback/{id}:
 *   delete:
 *     summary: Delete feedback by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feedback ID
 *     responses:
 *       200:
 *         description: Feedback deleted successfully
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Internal server error
 */
router.delete('/feedback/:id', deleteFeedback);

module.exports = router;
