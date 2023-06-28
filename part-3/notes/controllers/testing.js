const testingRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

// Empty database endpoint for E2E testing
testingRouter.post('/reset', async (request, response) => {
  await Note.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
