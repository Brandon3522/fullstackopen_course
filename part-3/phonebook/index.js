const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Multiple .env variables
require('dotenv').config();

// Import database person model
const Person = require('./models/person');

// Express json parser
app.use(express.json());

// Allow requests from all origins
app.use(cors());

// Show static content from build directory
app.use(express.static('build'));

// Log request body to console
morgan.token('body', (res) => {
  return JSON.stringify(res.body);
});

// Configure morgan logging
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

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
  res.status(404).send({ error: 'Unknown endpoint' });
};

// Middleware error handler
const errorHandler = (error, request, response, next) => {
  console.log(`Error: ${error.message}`);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

// Create person in database
/* const person = new Person({
	name: phonename,
	number: phonenumber,
}); */

// HTTP methods
app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>');
});

// Get all persons
app.get('/api/persons', (req, res, next) => {
  //res.json(persons)

  // MongoDB database
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => {
      next(err);
    });
});

// Get phonebook info
app.get('/api/info', (req, res, next) => {
  /* let persons_length = persons.length

	let time = new Date()

	res.send(`<p>Phonebook has info for ${persons_length} people.</p> <br/> <p>${time}</p>`) */

  // Database
  let time = new Date();

  // Get estimated count of documents
  Person.estimatedDocumentCount()
    .then((numDocuments) => {
      res.send(
        `<p>Phonebook has info for ${numDocuments} people.</p> <br/> <p>${time}</p>`
      );
    })
    .catch((error) => {
      next(error);
    });
});

// Get person by id
app.get('/api/persons/:id', function (req, res, next) {
  /* let id = Number(req.params.id)
	let person = persons.find(person => person.id === id)

	if (person) {
		res.json(person)
	} else {
		res.status(404).end()
	} */

  // Database
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Delete person by id
app.delete('/api/persons/:id', (request, response, next) => {
  /* let id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)

	res.status(204).end() */

  // Database
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      console.log('Person deleted successfully.');
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

// Update person
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  console.log('Updating person');

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

// Create new person
app.post('/api/persons', (req, res, next) => {
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
    number: body.number,
  });

  // Error
  if (body.number.trim() === '') {
    return res.status(404).json({ error: 'Number is missing' });
  }

  // Save to database
  person
    .save()
    .then((newPerson) => {
      console.log(`Person created: ${newPerson.name}`);
      res.json(newPerson);
    })
    .catch((err) => {
      next(err);
    });
});

app.use(unknownEndpoint);

// Middleware error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Starting port ${PORT}`);
});
