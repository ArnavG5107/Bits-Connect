import React, { useState } from 'react';
import '../RegistrationPage.css';
import LeftSideImage from '../Assets/BL.png';

const SignInPage = ({ onBackToRegister, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // API URL - set this to your backend server address
  const API_URL = 'http://localhost:5000'; // Changed to match your registration page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Call the actual login API
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include' // For handling cookies
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
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }
      
      // Login successful
      setSuccess('Login successful! Redirecting to resume...');
      
      // Store auth token
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Store user data if available in response
      if (data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user));
      }
      
      // Use the callback prop after a brief delay
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          window.location.href = '/resume';
        }
      }, 1000);
    
    } catch (err) {
      setError(err.message || 'Server error. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Define input styles with black text
  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    color: '#000000', // Changed to black
    fontSize: '14px'
  };

  return (
    <div className="signup-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Left side with custom image */}
      <div 
        className="left-panel" 
        style={{ 
          width: '20%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0a192f'
        }}
      >
        <div style={{
          width: '80%',
          height: '40%',
          backgroundImage: `url(${LeftSideImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          margin: 'auto'
        }}>
        </div>
      </div>
      
      {/* Right panel - Form section */}
      <div className="right-panel" style={{ width: '60%', overflow: 'auto' }}>
        <div className="form-container">
          <h1 className="form-title">SIGN IN</h1>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
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
                style={inputStyle}
              />
            </div>
            
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="login-link" style={{ color: 'white' }}>
            Don't have an account? <a href="#" onClick={(e) => {e.preventDefault(); onBackToRegister()}}>Register →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
