import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteForm from './NoteForm';

test('NoteForm updated parent state and calls onSubmit', async () => {
  const createNote = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<NoteForm createNote={createNote}></NoteForm>);

  // Get access to input field using input id
  const input = container.querySelector('#note-input');
  const sendButton = screen.getByText('Save');

  await user.type(input, 'testing a form...'); // Write text to input field
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1); // Create note function called

  // Note with correct content is created
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...');
});
