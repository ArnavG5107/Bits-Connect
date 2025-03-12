import "./App.css"
import CompanyCard from "./ComapanyCard.js"
import logo from "../../Assets/intern-connect-logo.svg"
import googleLogo from "../../Assets/google-logo.svg"
import microsoftLogo from "../../Assets/microsoft-logo.svg"
import amazonLogo from "../../Assets/amazon-logo.svg"
import goldmanLogo from "../../Assets/goldman-logo.svg"
import mcKinseyLogo from "../../Assets/mckinsey-logo.svg"
import jpMorganLogo from "../../Assets/jpmorgan-logo.svg"
import shellLogo from "../../Assets/shell-logo.svg"
import boeingLogo from "../../Assets/boeing-logo.svg"
import geLogo from "../../Assets/ge-logo.svg"

function InternConnect() {
  // Company Data
  const techCompanies = [
    {
      title: "Google",
      description:
        "Join Google's internship program and work on cutting-edge technology projects with world-class engineers.",
      image: googleLogo,
    },
    {
      title: "Microsoft",
      description:
        "Develop your skills in cloud computing, AI, and software development at Microsoft's global internship program.",
      image: microsoftLogo,
    },
    {
      title: "Amazon",
      description:
        "Experience fast-paced innovation and learn from industry leaders in e-commerce, cloud services, and more.",
      image: amazonLogo,
    },
  ]

  const businessCompanies = [
    {
      title: "Goldman Sachs",
      description: "Gain valuable experience in investment banking, financial analysis, and global markets.",
      image: goldmanLogo,
    },
    {
      title: "McKinsey & Co",
      description:
        "Work alongside top consultants solving complex business challenges for leading organizations worldwide.",
      image: mcKinseyLogo,
    },
    {
      title: "JP Morgan",
      description:
        "Develop your financial acumen and business skills at one of the world's leading financial institutions.",
      image: jpMorganLogo,
    },
  ]

  const coreCompanies = [
    {
      title: "Shell",
      description:
        "Join Shell's engineering internship program and contribute to sustainable energy solutions for the future.",
      image: shellLogo,
    },
    {
      title: "Boeing",
      description:
        "Design and build the next generation of aircraft and aerospace technologies with industry pioneers.",
      image: boeingLogo,
    },
    {
      title: "General Electric",
      description: "Gain hands-on experience across multiple engineering disciplines at this global industrial leader.",
      image: geLogo,
    },
  ]

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

      {/* Tech Companies Section */}
      <section className="companies-section">
        <h2 className="section-title">TECH COMPANIES</h2>
        <div className="card-grid">
          {techCompanies.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))}
        </div>
      </section>

      {/* Business Companies Section */}
      <section className="companies-section">
        <h2 className="section-title">BUSINESS COMPANIES</h2>
        <div className="card-grid">
          {businessCompanies.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))}
        </div>
      </section>

      {/* Core Companies Section */}
      <section className="companies-section">
        <h2 className="section-title">CORE COMPANIES</h2>
        <div className="card-grid">
          {coreCompanies.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default InternConnect;

