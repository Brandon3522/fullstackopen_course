import React, { useState, useEffect } from 'react';
import './index.css';
import Note from './components/Note.js';
import noteService from './services/notes.js'
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  // Notes state
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null)

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
	
	if (loading) {
		return(
			<>
				<h1>LOADING...</h1>
			</>
		)
	}

  return (
    <>
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
			<Footer />
    </>
  );
};

export default App;
