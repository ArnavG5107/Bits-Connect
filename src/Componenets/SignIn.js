import React, { useState } from 'react';
import '../SignIn.css';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    console.log('Sign in attempt with:', formData);
    // Add your authentication logic here
  };

  return (
    <div className="signin-container">
      <div 
        className="left-panel" 
        style={{ backgroundImage: 'url("https://source.unsplash.com/random/1200x900/?tech,abstract,network,lines")' }}
      ></div>
      <div className="right-panel">
        <div className="form-container">
          <h1 className="form-title">SIGN IN TO YOUR ACCOUNT</h1>
          <p className="form-subtitle">OFFER PLACEMENTS TO BITSIANS</p>
          
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
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;