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
  
  // Simulate fetching data from backend
  useEffect(() => {
    // Replace with your actual API call
    const fetchCompanies = async () => {
      try {
        // This is where you'd make your actual API call
        // For example: const response = await fetch('/api/companies');
        
        // Simulated data for demonstration
        const techCompanies = [
          {
            title: "Google",
            subtitle: "Software Engineering Intern",
            description: "Join Google's internship program and work on cutting-edge technology projects with world-class engineers.",
            image: "/assets/google.jpg",
            position: "Software Engineering Intern",
            prerequisites: "CS or related field, Programming skills in Java/Python",
            duration: "3 months",
            stipend: "₹75,000/month",
            location: "Bangalore, India",
            detailedDescription: "As a Software Engineering Intern at Google, you'll work on real products that impact millions of users. You'll collaborate with talented engineers and gain valuable experience in software development practices."
          },
          {
            title: "Microsoft",
            subtitle: "Cloud Engineering Intern",
            description: "Develop your skills in cloud computing, AI, and software development at Microsoft's global internship program.",
            image: "/assets/microsoft.jpg",
            position: "Cloud Engineering Intern",
            prerequisites: "Knowledge of cloud platforms, Programming experience",
            duration: "6 months",
            stipend: "₹60,000/month",
            location: "Hyderabad, India"
          },
          {
            title: "Amazon",
            subtitle: "Product Management Intern",
            description: "Experience fast-paced innovation and learn from industry leaders in e-commerce, cloud services, and more.",
            image: "../../assets/amazon.jpg",
            position: "Product Management Intern",
            prerequisites: "MBA or equivalent, Technical background preferred",
            duration: "4 months",
            stipend: "₹70,000/month",
            location: "Gurgaon, India"
          },
        ];
        
        const businessCompanies = [
          {
            title: "Goldman Sachs",
            subtitle: "Investment Banking Intern",
            description: "Gain valuable experience in investment banking, financial analysis, and global markets.",
            image: "/assets/goldman.jpg",
            position: "Investment Banking Intern",
            prerequisites: "Finance background, Excel & modeling skills",
            duration: "3 months",
            stipend: "₹65,000/month",
            location: "Mumbai, India"
          },
          {
            title: "McKinsey & Co",
            subtitle: "Business Analyst Intern",
            description: "Work alongside top consultants solving complex business challenges for leading organizations worldwide.",
            image: "/assets/mckinsey.jpg",
            position: "Business Analyst Intern",
            prerequisites: "MBA or equivalent, Strong analytical skills",
            duration: "6 months",
            stipend: "₹80,000/month",
            location: "Delhi, India"
          },
          {
            title: "JP Morgan",
            subtitle: "Financial Analyst Intern",
            description: "Develop your financial acumen and business skills at one of the world's leading financial institutions.",
            image: "/assets/jpmorgan.jpg",
            position: "Financial Analyst Intern",
            prerequisites: "Finance or Economics major, Strong Excel skills",
            duration: "4 months",
            stipend: "₹60,000/month",
            location: "Bangalore, India"
          },
        ];
        
        const coreCompanies = [
          {
            title: "Shell",
            subtitle: "Energy Engineering Intern",
            description: "Join Shell's engineering internship program and contribute to sustainable energy solutions for the future.",
            image: "/assets/shell.jpg",
            position: "Energy Engineering Intern",
            prerequisites: "Engineering background, Knowledge of energy systems",
            duration: "6 months",
            stipend: "₹50,000/month",
            location: "Chennai, India"
          },
          {
            title: "Boeing",
            subtitle: "Aerospace Engineering Intern",
            description: "Design and build the next generation of aircraft and aerospace technologies with industry pioneers.",
            image: "/assets/boeing.jpg",
            position: "Aerospace Engineering Intern",
            prerequisites: "Aerospace or Mechanical Engineering degree",
            duration: "3 months",
            stipend: "₹55,000/month",
            location: "Hyderabad, India"
          },
          {
            title: "General Electric",
            subtitle: "Electrical Engineering Intern",
            description: "Gain hands-on experience across multiple engineering disciplines at this global industrial leader.",
            image: "/assets/ge.jpg",
            position: "Electrical Engineering Intern",
            prerequisites: "Electrical Engineering background",
            duration: "4 months",
            stipend: "₹45,000/month",
            location: "Pune, India"
          },
        ];

        setCompanies({
          tech: techCompanies,
          business: businessCompanies,
          core: coreCompanies
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

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
      ) : (
        <>
          {/* Tech Companies Section */}
          <section className="companies-section">
            <h2 className="section-title">TECH COMPANIES</h2>
            <div className="card-grid">
              {companies.tech.map((company, index) => (
                <CompanyCard key={index} company={company} />
              ))}
            </div>
          </section>

          {/* Business Companies Section */}
          <section className="companies-section">
            <h2 className="section-title">BUSINESS COMPANIES</h2>
            <div className="card-grid">
              {companies.business.map((company, index) => (
                <CompanyCard key={index} company={company} />
              ))}
            </div>
          </section>

          {/* Core Companies Section */}
          <section className="companies-section">
            <h2 className="section-title">CORE COMPANIES</h2>
            <div className="card-grid">
              {companies.core.map((company, index) => (
                <CompanyCard key={index} company={company} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default InternConnect;
