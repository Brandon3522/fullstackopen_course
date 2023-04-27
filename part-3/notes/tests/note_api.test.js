const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const Note = require('../models/note');

// Used for making tests on HTTP requests from the backend
const api = supertest(app);

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

// Run before each test
beforeEach(async () => {
  await Note.deleteMany({});
  
	for (let note of helper.initialNotes) {
		let noteObject = new Note(note);
		await noteObject.save();
	}
});

test('notes returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/); // RegEx
});

test('there are 2 notes', async () => {
  const response = await api.get('/api/notes');

  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in variable response
  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('specific note is returned in notes', async () => {
  const response = await api.get('/api/notes');

  // Create array with content from all notes in the API
  // toContain: Check if given note is in list of notes
  const contents = response.body.map((r) => r.content);
  expect(contents).toContain('Browser can execute only JavaScript');
});

test('valid note added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);
  expect(contents).toContain('async/await simplifies making async calls');
});

test('note without content not added', async () => {
  const newNote = {
    important: true,
  };

  await api.post('/api/notes').send(newNote).expect(400);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

test('specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultNote.body).toEqual(noteToView);
});

test('note correctly deleted', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

  const contents = notesAtEnd.map((n) => n.content);

  expect(contents).not.toContain(noteToDelete.content);
});

// Close mongoose connection after all tests have finished
afterAll(async () => {
  await mongoose.connection.close();
});