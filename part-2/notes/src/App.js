import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import Note from './components/Note.js';
import noteService from './services/notes.js';
import loginService from './services/login.js';
import Notification from './components/Notification';
import Footer from './components/Footer';
import Login from './components/Login';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';

const App = () => {
  // Notes state
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
	const [loginVisible, setLoginVisible] = useState(false);

	const noteFormRef = useRef();

  // GET notes from local server
  useEffect(() => {
    console.log('effect');
    noteService.getAll().then((initialNotes) => {
      console.log('Promise fulfilled');
      setNotes(initialNotes);
    });

    setLoading(false);
  }, []);

	// Get logged in user if they exist
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON); // Parse JSON back to javascript object
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);

  // Login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
			window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)); // Save user to localStorage
			noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Invalid credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // const filterPersons = persons.filter((person) => {
  //   return person.name.toLowerCase().includes(search.toLowerCase());
  // });

  // True: notes, false: filter for important notes
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  // Toggle importance of note
  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `The note '${note.content}' was already removed from the server.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

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
  const addNote = (noteObject) => {
		noteFormRef.current.toggleVisibility();
    noteService
			.create(noteObject)
			.then((returnedNote) => {
      	setNotes(notes.concat(returnedNote));
    });
  };

  // Alternate method to save input
	const handleNoteChange = (event) => {
		console.log(event.target.value);
		setNewNote(event.target.value);
	}
	

  /* const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
		const showWhenVisible = { display: loginVisible ? '' : 'none' }

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setLoginVisible(true)}>Login</button>
				</div>

				<div style={showWhenVisible}>
					<Login 
						username={username}
						password={password}
						setPassword={setPassword}
						setUsername={setUsername}
						handleLogin={handleLogin}
					 />

				<button onClick={() => setLoginVisible(false)}>Cancel</button>
				</div>
			</div>
		)
	};
	*/

  /* const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  ); */
 
  if (loading) {
    return (
      <>
        <h1>LOADING...</h1>
      </>
    );
  }

  return (
    <>
      {/* Notes */}
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {/* Conditionally render forms -> replaced with togglable component */}
      {/* {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}
      <br /> */}

			<Togglable buttonLabel='Login'>
				<Login 
					username={username}
					password={password}
					setPassword={setPassword}
					setUsername={setUsername}
					handleLogin={handleLogin}
				/>
			</Togglable>

			<Togglable buttonLabel='New note' ref={noteFormRef}>
				<NoteForm createNote={addNote}/>
			</Togglable>

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

      {/* Notes */}
      <br />
      <Footer />
    </>
  );
};

export default App;
