const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

describe('Initially one user in database', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sekret', 10);
		const user = new User({ username: 'root', passwordHash });

		await user.save();
	})

	test('User successfully created with original username', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'brandon',
			name: 'brandon s',
			password: 'password',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((user) => user.username);
		expect(usernames).toContain(newUser.username);
	})

	test('Fail to create user with proper statuscode and message if user exists', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'root',
			name: 'user',
			password: 'password',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('expected `username` to be unique');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toEqual(usersAtStart);
	})

})

afterAll(async () => {
	await mongoose.connection.close();
})