import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedNoteappUser');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      console.log(`User token: ${user.token}`);
      setUsername('');
      setPassword('');
      setLoginSuccessMessage(`${user.username} logged in successfully`);
      setTimeout(() => {
        setLoginSuccessMessage(null);
      }, 5000);
    } catch (error) {
      setLoginErrorMessage(`Invalid username or password`);
      setTimeout(() => {
        setLoginErrorMessage(null);
      }, 5000);
      console.log(error.response.data.error);
    }
  };

  const handleLogout = () => {
    // event.preventDefault();
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  };

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      };

      const returnedBlog = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(returnedBlog));

      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
      setSuccessMessage(
        `A new blog, ${newBlog.title}, was created by ${newBlog.author}`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage(
        `Failed to create new blog: ${error.response.data.error}`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      console.log(error.response.data.error);
    }
  };

  if (!user) {
    return (
      <>
        <ErrorMessage message={loginErrorMessage} />
        <Login
          password={password}
          setPassword={setPassword}
          username={username}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      </>
    );
  }

  return (
    <div>
      <SuccessMessage message={loginSuccessMessage} />
      {user && <div> {user.username} logged in </div>}
      <br />
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />

      <div>
        <BlogForm
          handleBlogCreation={handleBlogCreation}
          title={blogTitle}
          setTitle={setBlogTitle}
          author={blogAuthor}
          setAuthor={setBlogAuthor}
          url={blogUrl}
          setUrl={setBlogUrl}
        />
      </div>

      <h2>blogs</h2>

      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
