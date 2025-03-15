import React, { useState, useEffect } from 'react';
import '../RegistrationPage.css';
import LeftSideImage from '../Assets/BL.png'; // Import your image here

const SignInPage = ({ onBackToRegister, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // API URL - set this to your backend server address
  const API_URL = 'http://localhost:3000';

  // Add a direct access button and function
  const handleDirectAccess = () => {
    // Create a mock token and user data
    const mockToken = "mock_auth_token_for_development";
    const mockUserData = {
      id: "dev123",
      name: "Development User",
      email: "dev@example.com",
      role: "user", // Adding role which might be needed
      // Add any other fields your profile page expects
    };
    
    // Store mock data in localStorage (same as after successful login)
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('userData', JSON.stringify(mockUserData));
    
    // Show success message
    setSuccess('Direct access mode: Redirecting to resume...');
    
    console.log("Direct access triggered, redirecting soon...");
    
    // Redirect immediately without timeout
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      console.error("onLoginSuccess callback is not defined");
      // Fallback redirect - if your app uses react-router
      try {
        window.location.href = '/resume'; // Direct URL navigation as fallback
      } catch (err) {
        console.error("Fallback navigation failed:", err);
      }
    }
  };

  // Auto-redirect to profile on component mount - uncomment to enable
  useEffect(() => {
    // Uncomment the line below to auto-redirect without clicking
    // handleDirectAccess();
    
    // Debug check for callback
    if (!onLoginSuccess) {
      console.warn("Warning: onLoginSuccess prop is not provided to SignInPage");
    }
  }, []);

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
      
      // For development - skip API call and go straight to success
      // Remove this section when your backend is ready
      setSuccess('Login successful! Redirecting to resume...');
      const mockToken = "mock_auth_token_for_development";
      const mockUserData = {
        id: "dev123",
        name: "Development User",
        email: formData.email,
        role: "user",
      };
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUserData));
      
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          // Fallback redirect
          window.location.href = '/resume';
        }
      }, 1000);
      
      return; // Skip the API call below during development
      
      // Regular API flow - uncomment when backend is ready
      /*
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }
      
      // Login successful
      setSuccess('Login successful! Redirecting to resume...');
      localStorage.setItem('authToken', data.token);
      
      // Store user data if available in response
      if (data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user));
      }
      
      // Use the callback prop
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          window.location.href = '/resume';
        }
      }, 1000);
      */
    
    } catch (err) {
      setError('Server error. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Left side with custom image - Reduced size and centered */}
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
          width: '80%',  // Reduced size - only 80% of the panel width
          height: '40%', // Reduced size - only 40% of the panel height
          backgroundImage: `url(${LeftSideImage})`,
          backgroundSize: 'contain', // Changed from 'cover' to 'contain'
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
          
          {/* Development Mode Banner */}
          <div className="dev-mode-banner" style={{ backgroundColor: '#ffeb3b', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
            <button 
              onClick={handleDirectAccess}
              style={{
                width: '100%',
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              GO TO RESUME (Dev Mode)
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
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
            
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="login-link">
            Don't have an account? <a href="#" onClick={(e) => {e.preventDefault(); onBackToRegister()}}>Register →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
