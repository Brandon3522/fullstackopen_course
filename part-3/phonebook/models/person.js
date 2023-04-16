const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false);
mongoose.connect(url)
	.then((result) => {
		console.log(`Connected to database`);
	})
	.catch((error) => {
		console.log(`Error connecting to database: ${error}`);
	})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Remove unnecessary data from returned object
personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)