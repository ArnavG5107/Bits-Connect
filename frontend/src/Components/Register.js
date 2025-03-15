import React, { useState } from 'react';
import '../RegistrationPage.css';
import SignInPage from './SignIn.js';

const RegistrationPage = ({ onRegisterSuccess }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // API URL - set this to your backend server address
  const API_URL = 'http://localhost:5000'; // This is correct

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Submitting registration data:', {
        name: formData.fullName,
        username: formData.username,
        email: formData.email,
        mobileNumber: formData.mobileNumber
        // password omitted for logging
      });
      
      // Send registration data to backend
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          mobileNumber: formData.mobileNumber
        }),
        credentials: 'include' // This helps with cookies if you implement token-based auth later
      });
      
      // Check content type to handle non-JSON responses
      const contentType = response.headers.get('content-type');
      
      if (!contentType || !contentType.includes('application/json')) {
        // Handle non-JSON responses
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        throw new Error('Server returned an invalid response format. Please try again later.');
      }
      
      const data = await response.json();
      console.log('Registration response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Registration successful
      setSuccess('Registration successful! Your data has been saved to MongoDB.');
      
      // Store auth token
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Call the callback function if provided (for App.js state)
      if (onRegisterSuccess) {
        onRegisterSuccess(data.token);
      } else {
        // Optional: redirect to login or dashboard if no callback
        setTimeout(() => {
          setShowLogin(true);
        }, 2000);
      }
      
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // If user wants to go to login page
  if (showLogin) {
    return <SignInPage onBackToRegister={() => setShowLogin(false)} onSignInSuccess={onRegisterSuccess} />;
  }

  return (
    <div className="signup-container">
      {/* Left panel with background image */}
      <div
        className="left-panel"
        style={{ backgroundImage: 'url("https://source.unsplash.com/random/1200x900/?tech,abstract,lines")' }}
      ></div>
      <div className="right-panel">
        <div className="form-container">
          <h1 className="form-title">REGISTER YOUR ACCOUNT</h1>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="USERNAME"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="FULL NAME"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="BIT's Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </form>
          
          <div className="login-link">
            Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); setShowLogin(true)}}>Sign in →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
