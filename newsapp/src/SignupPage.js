import React, { useState } from 'react';
import axios from 'axios'; // To make API calls
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    // Validation checks
    if (!username || !password || !preferences) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Simulate API call to register a new user
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password,
        preferences
      });

      if (response.data.success) {
        // Redirect to login page after successful signup
        navigate('/login');
      } else {
        setErrorMessage(response.data.message || 'Failed to sign up');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
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

        <div className="form-group">
          <label htmlFor="preferences">Preferences:</label>
          <select
            id="preferences"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            required
          >
            <option value="">Select preferences</option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
            <option value="Crime">Crime</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Politics">Politics</option>
            <option value="Music">Music</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
