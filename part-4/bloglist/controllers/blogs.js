const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;
    const user = await User.findById(body.user);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    // Find and delete blog with given id
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body;

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
