import React from 'react';
import PropTypes from 'prop-types';

const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label style={{ paddingRight: 5 }}>Username</label>
          <input
            type="text"
            value={username}
            id="username"
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
            id="password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />

        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
