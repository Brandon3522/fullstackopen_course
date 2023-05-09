// Utils
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
// Controllers
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
require('express-async-errors'); // Catch async errors

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(logger.info('Connecting to database'))
  .catch((error) => {
    logger.error('Error connecting', error.message);
  });

app.use(cors());
//app.use(express.static('build'));
app.use(express.json());

// API endpoints
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

// Middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(middleware.requestLogger);

module.exports = app;
