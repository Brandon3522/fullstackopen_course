import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('Display title and author only', () => {
  // Create blog
  const blog = {
    title: 'title',
    author: 'author',
    url: 'urlllll',
    likes: 10,
    user: {
      name: 'user',
    },
  };

  // Create mock functions
  const handleBlogUpdate = jest.fn();
  const handleBlogDelete = jest.fn();

  // Render blog
  render(
    <Blog
      blog={blog}
      handleBlogUpdate={handleBlogUpdate}
      handleBlogDelete={handleBlogDelete}
    />
  );

  // screen.debug();

  // Get the elements of the title and author
  const element_title_author = screen.getByText('title by author');
  const element_url = screen.queryByText('urlllll');
  const element_likes = screen.queryByText(10);

  // screen.debug(element_likes);

  // Expect the element to have the title and author, not URL or likes
  expect(element_title_author).toBeDefined();

  expect(element_url).toBeNull();
  expect(element_likes).toBeNull();
});

test('Display URL and likes when button is clicked', async () => {
  // Create blog
  const blog = {
    title: 'title',
    author: 'author',
    url: 'urlllll',
    likes: 10,
    user: {
      name: 'user',
    },
  };

  // Create mock functions
  const handleBlogUpdate = jest.fn();
  const handleBlogDelete = jest.fn();

  // Render blog
  render(
    <Blog
      blog={blog}
      handleBlogUpdate={handleBlogUpdate}
      handleBlogDelete={handleBlogDelete}
    />
  );

  // Create user event setup
  const user = userEvent.setup();

  // Event -> button click
  const button = screen.getByText('View');
  await user.click(button);

  // Get URL and likes
  const element_url = screen.queryByText('urlllll');
  const element_likes = screen.queryByText(10);

  // Expect URL / likes displayed
  expect(element_url).toBeDefined();
  expect(element_likes).toBeDefined();
});

test('Ensure like button is functional', async () => {
  // Create blog
  const blog = {
    title: 'title',
    author: 'author',
    url: 'urlllll',
    likes: 10,
    user: {
      name: 'user',
    },
  };

  // Create mock functions
  const handleBlogUpdate = jest.fn();
  const handleBlogDelete = jest.fn();

  // Render blog
  render(
    <Blog
      blog={blog}
      handleBlogUpdate={handleBlogUpdate}
      handleBlogDelete={handleBlogDelete}
    />
  );

  // Create user event setup
  const user = userEvent.setup();

  // Event -> button click for view
  const button = screen.getByText('View');
  await user.click(button);

  // Event -> button click for likes
  const button_likes = screen.getByText('Likes');
  await user.click(button_likes);
  await user.click(button_likes);

  // Ensure button is clicked twice
  expect(handleBlogUpdate.mock.calls).toHaveLength(2);
});
