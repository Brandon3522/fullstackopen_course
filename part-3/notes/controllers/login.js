const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body;

	// Find user
	const user = await User.findOne({username});

	// Verify password
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({error: 'Invalid password or username'});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	// Create token for user, expires in 60*60 seconds -> 1 hr
	const token = jwt.sign(
		userForToken, 
		process.env.SECRET,
		{ expiresIn: 60 * 60 }
		);

	response.status(200).send({token, username: user.username, name: user.name});
})


module.exports = loginRouter;