import { useState } from 'react';

const Blog = ({ blog, handleBlogUpdate }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };

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
	}

	handleBlogUpdate(blogToUpdate);
};

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button style={{ marginLeft: '10px' }} onClick={setVisibility}>
          View
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} by {blog.author}
        <button style={{ marginLeft: '10px' }} onClick={setVisibility}>
          Hide
        </button>
        <br />
        {blog.url}
        <br />
        {blog.likes}
				<button onClick={updateBlog}style={{marginLeft: '10px'}}>Likes</button>
        <br />
        {blog.user.name === undefined || blog.user.name === null
          ? ''
          : blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
