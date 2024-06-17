const express = require('express');
const connectDB = require('./config/db');

const dotenv = require('dotenv');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', feedbackRoutes);
app.use('/api/users', userRoutes);


// Connect to database and start server
connectDB().then(() => {
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
}).catch(err => {
  logger.error('Failed to start server', err);
});
