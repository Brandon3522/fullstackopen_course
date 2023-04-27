const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const supertest = require('supertest');

// Helper functions
const helper = require('./test_helper');

const api = supertest(app);

// Initialize notes, maybe abstract to helper module

// Initialize database with notes
beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

// Tests, refactor api call to async / await after each test passes
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

  const response = await api.post('/api/blogs').send(newBlog).expect(400);

  console.log(`Response: ${response}`);
});

// Close the connection with afterAll
afterAll(async () => {
  await mongoose.connection.close();
});
