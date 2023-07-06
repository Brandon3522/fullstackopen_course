import React from 'react';
import { useState } from 'react';

function BlogForm({ handleBlogCreation, user }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user.name,
    };

    //console.log(user.name)

    // Pass new blog to function
    handleBlogCreation(blogObject);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <form onSubmit={addBlog}>
        <label style={{ marginRight: 15 }} htmlFor="title">
          Title:{' '}
        </label>
        <input
          type="text"
          name="title"
          id="title_input"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        ></input>
        <br />

        <label htmlFor="author">Author: </label>
        <input
          type="text"
          name="author"
          id="author_input"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
        <br />

        <label style={{ marginRight: 15 }} htmlFor="url">
          URL:{' '}
        </label>
        <input
          type="text"
          name="url"
          id="url_input"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        ></input>
        <br />
        <br />

        <button className='saveBlog-button' type="submit">Create</button>
      </form>
    </>
  );
}

export default BlogForm;
