import React from 'react';

function Login({ username, setUsername, password, setPassword, handleLogin }) {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label style={{ paddingRight: 5 }}>Username</label>
        <input
          style={{ marginRight: 20 }}
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>

        <label style={{ paddingRight: 5 }}>Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <br />
        <br />

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;
