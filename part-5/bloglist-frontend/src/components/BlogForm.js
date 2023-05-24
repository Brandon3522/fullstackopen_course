import React from 'react'

function BlogForm({handleBlogCreation, title, setTitle, author, setAuthor, url, setUrl}) {
	return (
		<>
			<form onSubmit={handleBlogCreation}>
				<label style={{marginRight: 15}} for='title'>Title: </label>
				<input type='text' name='title' value={title} onChange={({target}) => setTitle(target.value)}></input>
				<br />

				<label for='author'>Author: </label>
				<input type='text' name='author' value={author} onChange={({target}) => setAuthor(target.value)}></input>
				<br />

				<label style={{marginRight: 15}} for='url'>URL: </label>
				<input type='text' name='url' value={url} onChange={({target}) => setUrl(target.value)}></input>
				<br />
				<br />

				<button type='submit'>Create</button>
			</form>
		</>
	)
}

export default BlogForm