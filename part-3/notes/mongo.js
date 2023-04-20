
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Enter mongodb password: ')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://tylersitz17:${password}@cluster0.l1vtbms.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

// const note2 = new Note({
//   content: 'CSS is Hard',
//   important: true,
// })

Note.find({}).then(result => {
	result.forEach(note => {
		console.log(note)	
	})
	mongoose.connection.close()
})
