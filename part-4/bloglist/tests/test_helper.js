const Blog = require('../models/blog');

// Initialize data
const initialBlogs = [
  {
    title: 'test1 title',
    author: 'test1 author',
    url: 'test1 url',
    likes: 5,
  },
  {
    title: 'test2 title',
    author: 'test2 author',
    url: 'test2 url',
    likes: 6,
  },
];

// Create a database object ID that doesn't belong to any note object in database
const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovesoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

// Retrieve blogs from database in JSON format
const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
