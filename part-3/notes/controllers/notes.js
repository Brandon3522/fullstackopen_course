const notesRouter = require('express').Router();
const Note = require('../models/note');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Define all related routes in a single module

notesRouter.get('/', async (request, response) => {
  /* Note.find({}).then(notes => {
    response.json(notes)
  }) */

  // Async / await
  const notes = await Note
		.find({}).populate('user', { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get('/:id', async (request, response, next) => {
  /* Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error)) */

  // Async / await
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.startsWith('bearer ')) {
		return authorization.replace('bearer ', '');
	}
	return null;
}

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;

	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
	if (!decodedToken.id) {
		console.log('Invalid token');
		return response.status(401).json({error: 'Invalid token'});
	}

	const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important || false,
		user: user.id,
  });

  const savedNote = await note.save();

	user.notes = user.notes.concat(savedNote._id);
	await user.save();

  response.status(201).json(savedNote);
});

notesRouter.delete('/:id', async (request, response, next) => {
  /* Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error)) */

  // Async / await
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
