const logger = require('./logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

// Routes can access the token if placed before all routes in app.js
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('bearer')) {
    const token = authorization.substring(7);
    //logger.info(`Token: ${token}`);
    request['token'] = token;
  }

  next();
};

// Find the user and set to request object
const userExtractor = async (request, response, next) => {
  // Verify token
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken) {
      return response.status(401).json({ error: 'Invalid token' });
    }

    // Get user
    const user = await User.findById(decodedToken.id);

    logger.info(`User: ${user.username}`);

    request['user'] = user;
  } catch (error) {
    next(error);
  }

  next();
};

// Unknown Endpoint
const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'Unknown Endpoint' });
};

// Error Handler
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.message.match(/ObjectId failed/) || error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted Id' });
  } else if (
    error.message.match(/validation failed/) ||
    error.name === 'Validation Error'
  ) {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  requestLogger,
  tokenExtractor,
  userExtractor,
};
