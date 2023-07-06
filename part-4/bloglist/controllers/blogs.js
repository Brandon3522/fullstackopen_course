const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const middleware = require('../utils/middleware');

// Token helper function
// Isolate token from authorization header
/* const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('bearer ')) {
    logger.info(`Authorization: ${authorization}`);
    return authorization.replace('bearer ', '');
  }
  return null;
}; */

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body;

		console.log(body);

    const user = request.user;

		console.log(`User: ${user}`);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if (blog && blog.user._id.toString() === user._id.toString()) {
      // Find and delete blog with given id
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: 'Invalid blog or user' });
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body;

    console.log(body);

    const blogToUpdate = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };

    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      blogToUpdate,
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    );

    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
