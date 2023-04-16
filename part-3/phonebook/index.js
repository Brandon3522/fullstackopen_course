const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const app = express();

// Multiple .env variables
require('dotenv').config();

// Import database person model
const Person = require('./models/person')

// Express json parser
app.use(express.json())

// Allow requests from all origins
app.use(cors())

// Show static content from build directory
app.use(express.static('build'))

// Log request body to console
morgan.token('body', (res, req) => {
	return JSON.stringify(res.body)
})

// Configure morgan logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


/* Log request information
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)
*/

// Catch unknown endpoints in API
const unknownEndpoint = (req, res) => {
	res.status(404).send({error: 'Unknown endpoint'});
}

/* let persons = [
	{ 
		"id": 1,
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{ 
		"id": 2,
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{ 
		"id": 3,
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": 4,
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
] */

// Create person in database
/* const person = new Person({
	name: phonename,
	number: phonenumber,
}); */

// HTTP methods
app.get('/', (req, res) => {
	res.send("<h1>Hello</h1>")
})

// Get all persons
app.get('/api/persons', (req, res) => {
	//res.json(persons)

	// MongoDB database 
	Person.find({})
		.then((persons) => {
			res.json(persons);
		})
		.catch((err) => {
			console.log(`Error retrieving people: ${err.message}`)
		})
})

// Get phonebook info
app.get('/api/info', (req, res) => {
	let persons_length  = persons.length

	let time = new Date()

	res.send(`<p>Phonebook has info for ${persons_length} people.</p> <br/> <p>${time}</p>`)
})

// Get person by id
app.get('/api/persons/:id', function (req, res) {
	let id = Number(req.params.id)
	let person = persons.find(person => person.id === id)

	if (person) {
		res.json(person)
	} else {
		res.status(404).end()
	}
})

// Delete person by id
app.delete('/api/persons/:id', (req, res) => {
	let id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)

	res.status(204).end()
})

// Create new person
app.post('/api/persons', (req, res) => {
	/* let max = Number(1000)
	let min = Number(0)
	let id = (Math.random() * (max - min) + min).toFixed(0)

	let new_person = req.body
	new_person.id = id

	// Name or number missing
	let name = persons.find(person => person.name === new_person.name)
	// console.log(new_person.name)
	// console.log(name)
	if (new_person.name === '') {
		res.status(400).send({
			error: 'Name is missing'
		})
	}
	else if (new_person.number === '') {
		res.status(400).send({
			error: 'Number is missing'
		})
	}
	else if (name !== undefined) { // Name is already in phonebook
		res.status(400).send({
			error: 'Name must be unique'
		})
	} else { // Valid person
		persons = persons.concat(new_person)

		res.json(new_person)
	} */

	// Database
	const body = req.body;

	// Create person
	const person = new Person({
		name: body.name,
		number: body.number
	})

	// Error
	if (body.name.trim() === '' || body.number.trim() === '') {
		return res.status(404).json({error: 'Name or number is missing'});
	}

	// Save to database
	person.save()
		.then((newPerson) => {
			console.log(`Person created: ${newPerson.name}`)
			res.json(newPerson)
		})
		.catch((err) => {
			console.log(`Error creating person: ${err.message}`)
		})
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
	console.log(`Starting port ${PORT}`)
})