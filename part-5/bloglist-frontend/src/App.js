import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

	useEffect(() => {
		const loggedInUser = window.localStorage.getItem('loggedNoteappUser');

		if (loggedInUser) {
			const user = JSON.parse(loggedInUser);
			setUser(user);
		}
	}, [])


	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({username, password});
			window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			console.log(error.response.data.error);
		}
	}

	const handleLogout = (event) => {
		// event.preventDefault();
		window.localStorage.removeItem('loggedNoteappUser');
		setUser(null);
	}

	if (!user) {
		return (
			<>
				<Login password={password} setPassword={setPassword} 
				username={username} setUsername={setUsername} handleLogin={handleLogin}/>
			</>
		)
	}

  return (
    <div>
			{user && <div> {user.username} logged in </div>}
			<br/>
			<div>
				<button onClick={handleLogout}>Logout</button>
			</div>
			<br />

			<div>
				<BlogForm />
			</div>
			
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App