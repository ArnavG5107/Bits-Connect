import "./Companycard.css"

function CompanyCard({ company }) {
  return (
    <div className="company-card">
      {/* Orange corner accents */}
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>

      <div className="card-content">
        <div className="company-logo">
          <img src={company.image || "/placeholder.svg"} alt={company.title} />
        </div>
        <h2 className="company-title">{company.title}</h2>
        <p className="company-description">{company.description}</p>
        <div className="card-buttons">
          <button className="register-button">Register Now</button>
          <button className="details-button">View Details</button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard;