import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleBlogUpdate, handleBlogDelete }) => {
  const [visible, setVisible] = useState(false);
  // const [deleteVisible, setDeleteVisible] = useState(true);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };

  // const showDeleteVisible = { display: deleteVisible ? '' : 'none' };

  /* const setDeleteVisibility = (blog) => {
    console.log(`${blog.user.id} ${user.id}`);
    if (blog.user.id === user.id) {
      setDeleteVisible(!deleteVisible);
    }
  }; */


  const setVisibility = () => {
    setVisible(!visible);
  };

  // console.log(`${blog.user.name}`)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    width: '50%',
    marginBottom: 5,
  };

  const updateBlog = (event) => {
    event.preventDefault();

    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1
    };

    handleBlogUpdate(blogToUpdate);
  };

  const deleteBlog = (event) => {
    event.preventDefault();

    handleBlogDelete(blog);
  };

  return (
    <div className='blog' style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button className='viewBlog-button' style={{ marginLeft: '10px' }} onClick={setVisibility}>
          View
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} by {blog.author}
        <button className='hideBlog-button' style={{ marginLeft: '10px' }} onClick={setVisibility}>
          Hide
        </button>
        <br />
        {blog.url}
        <br />
        {blog.likes}
        <button className='addLike-button' onClick={updateBlog} style={{ marginLeft: '10px' }}>Likes</button>
        <br />
        {blog.user.name === undefined || blog.user.name === null
          ? ''
          : blog.user.name}
        <span>
          <button className='deleteBlog-button' onClick={deleteBlog} style={{ marginLeft: '10px' }}>Delete</button>
        </span>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleBlogUpdate: PropTypes.func.isRequired,
  handleBlogDelete: PropTypes.func.isRequired,
};

export default Blog;
