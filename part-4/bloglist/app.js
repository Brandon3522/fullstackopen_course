// Utils
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
// Controllers
const blogsRouter = require('./controllers/blogs');
// Models
const blog = require('./models/blog');

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

app.use(cors())
//app.use(express.static('build'));
app.use(express.json())

// API endpoints
app.use('/api/blogs', blogsRouter);

// Middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;