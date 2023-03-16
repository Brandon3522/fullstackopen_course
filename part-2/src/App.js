import React, { useState, useEffect } from 'react';
import './index.css';
import Course from './components/Course.js';
import Note from './components/Note.js';
import Filter from './components/Filter';
import Persons from './components/Persons';
import AddPerson from './components/AddPerson';
import axios from 'axios';
import noteService from './services/notes.js'
import personService from './services/persons.js'
import Notification from './components/Notification';
import Footer from './components/Footer';
import Success from './components/Success';
import Error from './components/Error';

const App = () => {
  // Notes state
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null)

  // Phonebook state
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [search, setSearch] = useState('');
	const [successMessage, setSuccessMessage] = useState(null)
	const [deleteError, setDeleteError] = useState(null)

	// GET notes from local server
	useEffect(() => {
		console.log('effect');
		noteService
			.getAll()
			.then((initialNotes) => {
				console.log('Promise fulfilled');
				setNotes(initialNotes)
			})

		setLoading(false)
	}, [])

	// GET persons from local server
	useEffect(() => {
		console.log('effect');
		personService
			.getAll()
			.then((initialPeople) => {
				console.log('Promise fulfilled');
				setPersons(initialPeople)
			})

			setLoading(false)
	}, [])
	

  // const filterPersons = persons.filter((person) => {
  //   return person.name.toLowerCase().includes(search.toLowerCase());
  // });

  // True: notes, false: filter for important notes
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	// Toggle importance of note
	const toggleImportanceOf = (id) => {
		const note = notes.find(note => note.id === id)
		const changedNote = { ...note, important: !note.important }
		console.log(`Change note: ${changedNote}`);

		noteService
			.update(id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(note => note.id !== id ? note : returnedNote))
			})
			.catch(error => {
				setErrorMessage(`The note '${note.content}' was already removed from the server.`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000);
				setNotes(notes.filter(note => note.id !== id))
			})
	}

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

  // Note: Local addition
	/*
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
	*/

	// Note: Add with POST method
	const addNote = (event) => {
    event.preventDefault(); // Prevent page refresh
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService
			.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
  }; 

  // Alternate method to save input
  /*
	const handleNoteChange = (event) => {
		console.log(event.target.value);
		setNewNote(event.target.value);
	}
	*/

  // Phonebook
	// Fix adding duplicate name to database
  const addPerson = (event) => {
    event.preventDefault();
    const isEqual = doesPersonExist(newName);
    if (isEqual) {
      if (window.confirm(`${newName} is already added to the phonebook, would you like to replace the old number with the new number?`)) {
				// Replace old number with new number
				const currentPerson = persons.find(person => person.name === newName)
				const changedPerson = { ...currentPerson, number: number } // Change number

				personService
					.update(currentPerson.id, changedPerson)
					.then(returnedPerson => {
						// set new number
						console.log('in persons add update');
						setPersons(persons.map(person => person.id !== currentPerson.id ? person : returnedPerson))
						setNewName('')
						setNumber('')
					}).catch(error => {
						alert(error)
					})
				return
			}
    }

    const personObject = {
      name: newName,
      number: number,
    };

		personService
			.create(personObject)
			.then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
    		setNewName('')
				setNumber('')
				setSuccessMessage(`Added ${newName}`)
				setTimeout(() => {
					setSuccessMessage(null)
				}, 5000)
			})
			.catch((error) => {
				alert(error)
			})
  };

	// Delete person from persons and JSON database
	// id passed in from person component
	const deletePerson = (id) => {
		if (window.confirm(`Are you sure you want to delete this person?`)) {
			console.log(`Delete person: ${id}`)
			const personToDelete = persons.find(person => person.id === id)
			//const selectedPersonName = 
			console.log(personToDelete.name);

			personService
				.deletePerson(id)
				.then(returnedPerson => {
					setPersons(persons.filter(person => person.id !== id))
					console.log(persons)
				}).catch(error => {
					setDeleteError(`Information of '${personToDelete.name}' has already been deleted from the server.`)
					setTimeout(() => {
						setDeleteError(null)
					}, 5000);
					// setPersons(persons.filter(person => person.id !== id))
				})
		}
	}

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

	
	if (loading) {
		return(
			<>
				<h1>LOADING...</h1>
			</>
		)
	}

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
			<Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note 
						key={note.id} 
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
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
			<Success message={successMessage} />
			<Error message={deleteError} />
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
				name={newName}
				number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>All Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson}/>

      <Filter persons={persons} search={search} />

      {/* Phonebook */}

			<Footer />
    </>
  );
};

export default App;
