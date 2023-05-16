const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supertest = require('supertest');

// Helper functions
const helper = require('./test_helper');

const api = supertest(app);

// Initialize notes from helper

// Initialize database with notes
beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

// Tests
describe('Requesting blogs from database', () => {
  test('Get request returns correct amount of blog posts in json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('Verify existence of unique id', async () => {
    const blogs = await helper.blogsInDb();

    expect(blogs[0].id).toBeDefined();
  });
});

describe('Creating a blog', () => {
  let headers;
  let modifiedToken;

  beforeEach(async () => {
    // Initialize user
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'Test user', passwordHash });

    await user.save();

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    headers = {
      Authorization: `bearer ${token}`,
    };

    modifiedToken = token;
  });

  test('Create new blog successfully', async () => {
    const newBlog = {
      title: 'test3 title',
      author: 'test3 author',
      url: 'test3 url',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    const titles = blogs.map((blog) => blog.title);

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain('test3 title');
  });

  test('Likes property should be set to 0 if missing', async () => {
    const newBlog = {
      title: 'test4 title',
      author: 'test4 author',
      url: 'test4 url',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs[2].likes).toBe(0);
  });

  test('Blog missing title returns Bad Request', async () => {
    const newBlog = {
      author: 'test4 author',
      url: 'test4 url',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).set(headers).expect(400);
  });

  test('Fail to create blog with correct error if token is invalid', async () => {
    headers = {
      Authorization: `bearer ${modifiedToken.substring(1)}`,
    };

    const newBlog = {
      title: 'test4 title',
      author: 'test4 author',
      url: 'test4 url',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

describe('Deleting a blog', () => {
  let headers;
  let userid;

  beforeEach(async () => {
    // Initialize user
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'Test user', passwordHash });

    await user.save();

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    headers = {
      Authorization: `bearer ${token}`,
    };

    userid = user._id;
  });

  test('Successfully deleted a blog', async () => {
    const newBlog = {
      title: 'Test blog',
      author: 'Test',
      url: 'Test URL',
      likes: 15,
      user: userid,
    };

    const savedBlog = new Blog(newBlog);
    await savedBlog.save();

    // Get blog
    const blogsAtStart = await helper.blogsInDb();
    const blog = blogsAtStart.find((blog) => blog.title === newBlog.title);

    // Make request
    await api.delete(`/api/blogs/${blog.id}`).set(headers).expect(204);

    // Verify length
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    // Verify array doesn't contain blog
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain('Test blog');
  });

  test('Error if blog does not exist', async () => {
    const invalidId = 123456789;

    await api.delete(`/api/blogs/${invalidId}`).set(headers).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('Updating a blog', () => {
  test('Successfully updates a blog', async () => {
    // Info to update
    const updatedBlog = {
      title: 'blog1',
      author: 'newAuthor',
      url: 'newURL',
      likes: 1000,
    };

    const blogsAtStart = await helper.blogsInDb();
    const blog = blogsAtStart[0];

    // Make PUT request
    await api
      .put(`/api/blogs/${blog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // Expect blog to contain updated info
    const blogsAtEnd = await helper.blogsInDb();
    const endBlog = blogsAtEnd[0];

    expect(endBlog.title).toBe('blog1');
    expect(endBlog.author).toBe('newAuthor');
    expect(endBlog.url).toBe('newURL');
    expect(endBlog.likes).toBe(1000);
  });

  test('Return error with invalid ID', async () => {
    // Info to update
    const updatedBlog = {
      title: 'blog1',
      author: 'newAuthor',
      url: 'newURL',
      likes: 1000,
    };

    const invalidId = 123456789;

    // Make PUT request
    await api.put(`/api/blogs/${invalidId}`).send(updatedBlog).expect(400);
  });
});

// Close the connection with afterAll
afterAll(async () => {
  await mongoose.connection.close();
});
