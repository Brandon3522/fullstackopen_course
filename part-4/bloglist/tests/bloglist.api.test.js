const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
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

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('Deleting a blog', () => {
  test('Successfully deleted a blog', async () => {
    // Get blog
    const blogsAtStart = await helper.blogsInDb();
    const blog = blogsAtStart[0];

    // Make request
    await api.delete(`/api/blogs/${blog.id}`).expect(204);

    // Verify length
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    // Verify array doesn't contain blog
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain('test1 title');
  });

  test('Error if blog does not exist', async () => {
    const invalidId = 123456789;

    await api.delete(`/api/blogs/${invalidId}`).expect(400);

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
