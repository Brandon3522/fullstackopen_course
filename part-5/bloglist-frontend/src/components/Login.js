import React from 'react';

function Login({ username, setUsername, password, setPassword, handleLogin }) {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label style={{ paddingRight: 5 }}>Username</label>
        <input
          style={{ marginRight: 20 }}
          className="username-input"
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>

        <label style={{ paddingRight: 5 }}>Password</label>
        <input
          type="text"
          className="password-input"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <br />
        <br />

        <div>
          <button className='login-button' type="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;
