import React from 'react';

const Login = ({handleLogin, username, setUsername, password, setPassword}) => {
  return (
    <div>
			<h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label style={{ paddingRight: 5 }}>Username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <br />

        <div>
          <label style={{ paddingRight: 9 }}>Password</label>
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
