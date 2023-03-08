import React, { useState } from 'react';
import './index.css';
import Course from './components/Course.js';
import Note from './components/Note.js';
import Filter from './components/Filter';
import Person from './components/Person';
import Persons from './components/Persons';
import AddPerson from './components/AddPerson';

const App = (props) => {
  // Notes state
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  // Phonebook state
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [search, setSearch] = useState('');

  const filterPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(search.toLowerCase());
  });

  // True: notes, false: filter for important notes
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  // Note
  const addNote = (event) => {
    event.preventDefault(); // Prevent page refresh
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote('');
  };

  // Alternate method to save input
  /*
	const handleNoteChange = (event) => {
		console.log(event.target.value);
		setNewNote(event.target.value);
	}
	*/

  // Phonebook
  const addPerson = (event) => {
    event.preventDefault();
    const isEqual = doesPersonExist(newName);
    if (isEqual) {
      alert(`${newName} is already in the phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: number,
    };

    setPersons(persons.concat(personObject));
    setNewName('');
  };

  const doesPersonExist = (name) => {
    for (const person of persons) {
      if (person.name.toLowerCase() === name.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  return (
    <>
      {/* Courses */}
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Course name={course.name} parts={course.parts} />
          </li>
        ))}
      </ul>
      {/* Courses */}
      <br />

      {/* Notes */}
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <br />

      {/* Form */}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">Save</button>
      </form>
      {/* Notes */}
      <br />

      {/* Phonebook */}
      <h1>Phonebook</h1>

      {/* Search */}
      <div>
        Filter Numbers:
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>

			{/* Add person form */}
      <AddPerson
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>All Numbers</h2>
      <Persons persons={persons} />

      <Filter persons={persons} search={search} />

      {/* Phonebook */}
    </>
  );
};

export default App;
