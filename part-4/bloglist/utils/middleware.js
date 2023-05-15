const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

// Unknown Endpoint
const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'Unknown Endpoint' });
};

// Error Handler
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  console.log(error.message);

  if (error.message.match(/ObjectId failed/) || error.message === 'CastError') {
    return response.status(400).send({ error: 'Malformatted Id' });
  } else if (
    error.message.match(/validation failed/) ||
    error.message === 'Validation Error'
  ) {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  requestLogger,
};
