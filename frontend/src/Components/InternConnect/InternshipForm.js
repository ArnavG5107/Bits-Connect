import React, { useState } from 'react';
import './InternshipForm.css';

function InternshipForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    positionTitle: '',
    prerequisites: '',
    duration: '',
    stipend: '',
    location: '',
    description: '',
    companyLogo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      companyLogo: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="internship-form-container">
      <form className="internship-form" onSubmit={handleSubmit}>
        <h2>Internship Details</h2>
        
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email *</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contactPhone">Contact Phone *</label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="positionTitle">Position Title *</label>
          <input
            type="text"
            id="positionTitle"
            name="positionTitle"
            value={formData.positionTitle}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="prerequisites">Prerequisites *</label>
          <textarea
            id="prerequisites"
            name="prerequisites"
            value={formData.prerequisites}
            onChange={handleChange}
            placeholder="Skills, qualifications, etc."
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 3 months"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="stipend">Stipend</label>
            <input
              type="text"
              id="stipend"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              placeholder="e.g., ₹15,000/month"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Remote, Hyderabad, etc."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about the internship position"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="companyLogo">Company Logo</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="companyLogo"
              name="companyLogo"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        
        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default InternshipForm;