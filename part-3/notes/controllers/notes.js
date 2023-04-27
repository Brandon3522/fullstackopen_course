const notesRouter = require('express').Router()
const Note = require('../models/note')

// Define all related routes in a single module

notesRouter.get('/', async (request, response) => {
  /* Note.find({}).then(notes => {
    response.json(notes)
  }) */

	// Async / await
	const notes = await Note.find({});
	response.json(notes);
})

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
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

	const savedNote = await note.save();
	response.status(201).json(savedNote);
})

notesRouter.delete('/:id', async (request, response, next) => {
  /* Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error)) */

	// Async / await
	await Note.findByIdAndRemove(request.params.id);
	response.status(204).end();
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter