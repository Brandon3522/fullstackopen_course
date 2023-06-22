import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm.js';

test('New blog is created correctly', async () => {
  // Create mock function
  const createBlog = jest.fn();

  // Create user event setup
  const user_event = userEvent.setup();

  // User
  const user = {
    name: 'user',
  };

  // Create blog form
  const { container } = render(
    <BlogForm handleBlogCreation={createBlog} user={user} />
  );

  // Get input from fields by id
  const author_input = container.querySelector('#author_input');
  const url_input = container.querySelector('#url_input');
  const title_input = container.querySelector('#title_input');

  // Get button
  const button = screen.getByText('Create');

  // Generate input from user
  await user_event.type(title_input, 'here is the title');
  await user_event.type(url_input, 'here is the url');
  await user_event.type(author_input, 'here is the author');

  // Click the button to create a new blog
  await user_event.click(button);

  // Expect event to be triggered -> blog creation
  expect(createBlog.mock.calls).toHaveLength(1);

  // Expect blog to have given input
  expect(createBlog.mock.calls[0][0].title).toBe('here is the title');
  expect(createBlog.mock.calls[0][0].url).toBe('here is the url');
  expect(createBlog.mock.calls[0][0].author).toBe('here is the author');
});
