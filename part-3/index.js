//const http = require('http');
const express = require('express')
const cors = require('cors')

// Multiple .env variables
require('dotenv').config();

// Import Note model 
const Note = require('./models/note')

// Create express app
const app = express();

// Express json parser
app.use(express.json());

// Show static content from build directory
app.use(express.static('build'))

// Allow requests from all origins
app.use(cors())

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
app.get('/api/notes', (request, response) => {
	// MongoDB
	Note.find({})
		.then((notes) => {
			console.log(notes);
			response.json(notes)
		})
})

// Get single note
app.get('/api/notes/:id', (request, response) => {
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
			console.log(note);
			response.json(note);
		})
		.catch((error) => {
			console.log(`Error: ${error.message}`);
			response.status(404).end();
		})
})

// Delete note
app.delete('/api/notes/:id', (request, response) => {
	/* const id = Number(request.params.id);
	notes = notes.filter(note => note.id !== id);

	response.status(204).end(); // No content, return no data  */

	Note.findByIdAndDelete(request.params.id)
		.then((note) => {
			console.log(`Note Deleted`);
			response.json(note);
		})
		.catch((error) => {
			console.log(`Error: ${error.message}`);
			response.status(204).end(); // No content, return no data 
		})
})

// Create new note
app.post('/api/notes', (request, response) => {
	/* const maxId = notes.length > 0
		? Math.max(...notes.map((n) => n.id))
		: 0

	const note = request.body;
	note.id = maxId + 1;

	notes = notes.concat(note);

	response.json(note); */

	// Database request
	const body = request.body;

	if (body.content === undefined) {
		return response.status(404).json({error: 'Content missing'});
	}

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
			console.log(`Error: ${error.message}`)
		})

})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
})

