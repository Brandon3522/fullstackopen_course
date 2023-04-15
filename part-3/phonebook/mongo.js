const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Enter mongodb password: ');
  process.exit(1);
}

const password = process.argv[2];

const phonename = process.argv[3];

const phonenumber = process.argv[4];

const url = `mongodb+srv://tylersitz17:${password}@cluster0.l1vtbms.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// Create person in database
const person = new Person({
	name: phonename,
	number: phonenumber,
});

if (process.argv.length > 3) {
	person.save().then((result) => {
		console.log(`Added: ${phonename}, Number: ${phonenumber} to phonebook`);
		mongoose.connection.close();
	});
}

if (process.argv.length === 3) {
	// Display all people in database
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(person);
		});
		mongoose.connection.close();
	});
}
