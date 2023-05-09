const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const helper = require('./test_helper');

const api = supertest(app);

describe('One user in database', () => {
  // Before tests
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'Test user', passwordHash });

    await user.save();
  });

  // Tests
  test('User created successfully with unique username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Testing user',
      password: 'password',
      name: 'Testing user',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('Correct error for invalid password length', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Testing user',
      password: 'pa',
      name: 'Testing user',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'Password length must be at least 3 characters'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).not.toContain(newUser.username);
  });
});

// After tests
afterAll(async () => {
  await mongoose.connection.close();
});
