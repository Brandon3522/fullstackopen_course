import React from 'react'
import { useState } from 'react';

const NoteForm = ({createNote}) => {
	const [newNote, setNewNote] = useState('');

	const addNote = (event) => {
		event.preventDefault();
		createNote({
			content: newNote,
			important: true
		})

		setNewNote('');
	};

	const handleChange = (event) => {
		setNewNote(event.target.value);
	}

	return (
		<div>
			<h2>Create a new note</h2>

			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleChange}/>
				<button type='submit'>Save</button>
			</form>
		</div>
	)
}

export default NoteForm