const Note = require('../models/note');
const User = require('../models/user');

// Initialize notes
const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
];

// Create a database object ID that doesn't belong to any note object in database
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovesoon' });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

// Return notes stored in database
// Helps verify the state of the database
const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

// Return users stored in database
// Helps verify the state of the database
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
	usersInDb
};
