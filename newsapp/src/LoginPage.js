import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous error message
    setErrorMessage('');

    // Validate username and password
    if (!username || !password) {
      setErrorMessage('Username and Password are required.');
      return;
    }

    // Mock login credentials (replace with API call)
    if (username === 'user' && password === 'password') {
      // Simulate successful login
      navigate('/welcome');  // Navigate to the WelcomePage
    } else {
      // Display error if login fails
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2><u>News Recommendation</u></h2>
      <h2><center>Login</center></h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="login-btn">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/SignupPage">Sign up</Link>
      </p>
    </div>
  );
}

export default LoginPage;
