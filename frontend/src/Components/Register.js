import React, { useState } from 'react';
import '../RegistrationPage.css'; // We'll define styles here
import SignInPage from './SignIn.js'; // Import the LoginPage component

const RegistrationPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  // If showLogin is true, render the LoginPage component
  if (showLogin) {
    return <SignInPage onBackToRegister={() => setShowLogin(false)} />;
  }

  return (
    <div className="signup-container">
      <div
        className="left-panel"
        style={{ backgroundImage: 'url("https://source.unsplash.com/random/1200x900/?tech,abstract,lines")' }}
      ></div>
      <div className="right-panel">
        <div className="form-container">
          <h1 className="form-title">REGISTER YOUR ACCOUNT</h1>
          
          <form onSubmit={handleSubmit}>
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
            
            <button type="submit" className="submit-btn">Continue</button>
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