import React, { useState } from 'react';
import "./CompanyCard.css";

function CompanyCard({ company }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="company-card">
      {/* Corner accents */}
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>
      
      <div className="card-content">
        {!showDetails ? (
          // Front of card - Company overview
          <>
            <div className="company-logo">
              <img src={company.image || "/placeholder.svg"} alt={company.title} />
            </div>
            <h2 className="company-title">{company.title}</h2>
            <p className="company-subtitle">{company.subtitle || "Internship Opportunity"}</p>
            <p className="company-description">{company.description}</p>
            <div className="card-buttons">
              <button className="register-button">Register Now</button>
              <button className="details-button" onClick={toggleDetails}>View Details</button>
            </div>
          </>
        ) : (
          // Back of card - Internship details
          <div className="internship-details">
            <h3 className="details-title">Internship Details</h3>
            
            <div className="detail-item">
              <span className="detail-label">Position:</span>
              <span className="detail-value">{company.position || "Not specified"}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Prerequisites:</span>
              <span className="detail-value">{company.prerequisites || "Not specified"}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Duration:</span>
              <span className="detail-value">{company.duration || "Not specified"}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Stipend:</span>
              <span className="detail-value">{company.stipend || "Not specified"}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{company.location || "Not specified"}</span>
            </div>
            
            <div className="detail-item full-width">
              <span className="detail-label">Description:</span>
              <p className="detail-value detail-description">{company.detailedDescription || company.description}</p>
            </div>
            
            <div className="card-buttons">
              <button className="register-button">Register Now</button>
              <button className="details-button" onClick={toggleDetails}>Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyCard;
