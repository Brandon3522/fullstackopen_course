//const http = require('http');
const express = require('express')
const cors = require('cors')

// Multiple .env variables
require('dotenv').config();

// Import Note model 
const Note = require('./models/note')

// Create express app
const app = express();

// Show static content from build directory
app.use(express.static('build'))

// Express json parser
app.use(express.json());

// Allow requests from all origins
app.use(cors())

// Catch unknown endpoints in API
const unknownEndpoint = (req, res) => {
	res.status(404).send({error: 'Unknown endpoint'});
}

// Middleware error handler
const errorHandler = (error, request, response, next) => {
	console.log(error.message);
	

	if (error.name === 'CastError') {
		return response.status(400).send({error: 'Malformattd id'});
	}
	if (error.name === 'ValidationError') {
		return response.status(400).send({error: error.message})
	}

	next(error);
}

/*
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
*/

//const Note = mongoose.model('Note', noteSchema)

// HTTP method
// const app = http.createServer((request, response) => {
// 	response.writeHead(200, {'Content-Type': 'application/json'});
// 	response.end(JSON.stringify(notes));
// })

// Root request
// app.get('/', (request, response) => {
// 	response.send('<h1>Welcome!</h1>');
// })

// Get notes
app.get('/api/notes', (request, response, next) => {
	// MongoDB
	Note.find({})
		.then((notes) => {
			response.json(notes)
		})
		.catch(error => {
			next(error);
		})
})

// Get single note
app.get('/api/notes/:id', (request, response, next) => {
	/* const id = Number(request.params.id); // Convert to number
	const note = notes.find(note => note.id === id);

	if (note) {
		response.json(note); // note found
	} else {
		response.status(404).end(); // Error, note not found
	} */

	// Database request
	Note.findById(request.params.id)
		.then((note) => {
			if (note) {
				response.json(note);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => {
			next(error); // Pass error to next function for middleware
		})
})

// Delete note
app.delete('/api/notes/:id', (request, response, next) => {
	/* const id = Number(request.params.id);
	notes = notes.filter(note => note.id !== id);

	response.status(204).end(); // No content, return no data  */

	Note.findByIdAndRemove(request.params.id)
		.then((note) => {
			console.log(`Note Deleted`);
			response.status(204).end(); // No content, return no data 
		})
		.catch((error) => {
			next(error);
		})
})

// Update note
app.put('/api/notes/:id', (request, response, next) => {
	const { content, important } = request.body;

	Note.findByIdAndUpdate(
		request.params.id, 
		{ content, important }, 
		{ new: true, runValidators: true, context: 'query' }
	)
		.then((updatedNote) => {
			response.json(updatedNote);
		})
		.catch((error) => {
			next(error);
		})
})

// Create new note
app.post('/api/notes', (request, response, next) => {
	/* const maxId = notes.length > 0
		? Math.max(...notes.map((n) => n.id))
		: 0

	const note = request.body;
	note.id = maxId + 1;

	notes = notes.concat(note);

	response.json(note); */

	// Database request
	const body = request.body;

	const note = new Note({
		content: body.content,
		important: body.important || false,
	})

	note.save()
		.then((savedNote) => {
			console.log(`Note Created: ${savedNote}`);
			response.json(savedNote);
		})
		.catch((error) => {
			next(error);
		})

})

app.use(unknownEndpoint);

// Must be last loaded middleware
// Handle errors
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
})

