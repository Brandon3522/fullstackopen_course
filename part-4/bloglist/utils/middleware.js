const logger = require('./logger');

// Unknown Endpoint
const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'Unknown Endpoint' });
};

// Error Handler
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  console.log(error.message);

  if (error.message === 'CastError') {
    return response.status(400).send({ error: 'Malformatted Id' });
  } else if (
    error.message.match(/validation failed/) ||
    error.message === 'Validation Error'
  ) {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  errorHandler,
  unknownEndpoint,
};
