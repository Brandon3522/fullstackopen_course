import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';

test('renders content', () => {
  // Configure
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  // Create component
  render(<Note note={note} />);

  // Print HTML of component to console
  screen.debug();

  // Search for element with given note content
  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(element).toBeDefined();

  // Alternative
  /* const { container } = render(<Note note={note} />)

  const div = container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  ) */
});

test('clicking the button calls the event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  // Event handler
  const mockHandler = jest.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  // Create session to interact with component
  const user = userEvent.setup();

  // Find the button with the given text, click the button
  const button = screen.getByText('Make not important');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1); // Verify number of clicks
});
