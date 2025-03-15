import React, { useState, useEffect } from 'react';
import "./App.css";
import CompanyCard from "./CompanyCard";
import logo from "../../Assets/intern-connect-logo.svg";

function InternConnect() {
  const [companies, setCompanies] = useState({
    tech: [],
    business: [],
    core: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch data from backend
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        
        // Make actual API call to your backend
        const response = await fetch('http://localhost:5000/api/internships', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
          credentials: 'include'
        });
        
        // Check if response is ok
        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch internship data');
          } else {
            throw new Error('Server error. Please try again later.');
          }
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Categorize internships by sector
        const categorizedData = {
          tech: [],
          business: [],
          core: []
        };
        
        // Loop through internships and categorize them
        // Note: You'll need to adjust this based on how your data is structured
        data.forEach(internship => {
          // Example: categorize based on tags or keywords in the position title or description
          const positionLower = (internship.positionTitle || '').toLowerCase();
          const descriptionLower = (internship.description || '').toLowerCase();
          
          if (
            positionLower.includes('software') || 
            positionLower.includes('developer') || 
            positionLower.includes('engineering') ||
            positionLower.includes('tech') ||
            positionLower.includes('it') ||
            descriptionLower.includes('programming') ||
            descriptionLower.includes('coding')
          ) {
            categorizedData.tech.push(internship);
          } else if (
            positionLower.includes('business') || 
            positionLower.includes('finance') || 
            positionLower.includes('marketing') ||
            positionLower.includes('analyst') ||
            positionLower.includes('sales') ||
            positionLower.includes('consulting')
          ) {
            categorizedData.business.push(internship);
          } else {
            // Default to core if not matching tech or business
            categorizedData.core.push(internship);
          }
        });
        
        setCompanies(categorizedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching internships:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Format company data for card display
  const formatCompanyForCard = (internship) => {
    return {
      title: internship.companyName || 'Company Name',
      subtitle: internship.positionTitle || 'Position',
      description: internship.description ? internship.description.substring(0, 120) + '...' : 'No description available',
      image: internship.companyLogo || "/placeholder.svg",
      position: internship.positionTitle || 'Position',
      prerequisites: internship.prerequisites || 'Not specified',
      duration: internship.duration || 'Not specified',
      stipend: internship.stipend || 'Not specified',
      location: internship.location || 'Not specified',
      detailedDescription: internship.description || 'No detailed description available',
      contactEmail: internship.contactEmail || 'Not specified',
      contactPhone: internship.contactPhone || 'Not specified'
    };
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={logo || "/placeholder.svg"} alt="Intern Connect Logo" className="logo" />
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-title">
            <h1>
              INTERN
              <br />
              CONNECT
            </h1>
          </div>
          <div className="hero-tagline">
            <p>Where ideas ignite and connections are forged.</p>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="loading">Loading internship opportunities...</div>
      ) : error ? (
        <div className="error-message">
          <p>Error loading internships: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : (
        <>
          {/* Tech Companies Section */}
          <section className="companies-section">
            <h2 className="section-title">TECH COMPANIES</h2>
            {companies.tech.length > 0 ? (
              <div className="card-grid">
                {companies.tech.map((company, index) => (
                  <CompanyCard key={index} company={formatCompanyForCard(company)} />
                ))}
              </div>
            ) : (
              <p className="no-results">No tech internships available at the moment.</p>
            )}
          </section>

          {/* Business Companies Section */}
          <section className="companies-section">
            <h2 className="section-title">BUSINESS COMPANIES</h2>
            {companies.business.length > 0 ? (
              <div className="card-grid">
                {companies.business.map((company, index) => (
                  <CompanyCard key={index} company={formatCompanyForCard(company)} />
                ))}
              </div>
            ) : (
              <p className="no-results">No business internships available at the moment.</p>
            )}
          </section>

          {/* Core Companies Section */}
          <section className="companies-section">
            <h2 className="section-title">CORE COMPANIES</h2>
            {companies.core.length > 0 ? (
              <div className="card-grid">
                {companies.core.map((company, index) => (
                  <CompanyCard key={index} company={formatCompanyForCard(company)} />
                ))}
              </div>
            ) : (
              <p className="no-results">No core engineering internships available at the moment.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default InternConnect;
