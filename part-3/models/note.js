const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
    .then((result) => {
        console.log('Connected to DB')
    })
    .catch((error) => {
        console.log(`Error connecting to DB: ${error.message}`)
		})

const noteSchema = new mongoose.Schema({
  content: {
		type: String,
		minLength: 5,
		required: true,
	},
  important: Boolean,
})

// Remove unnecessary data from returned object
noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Note', noteSchema)