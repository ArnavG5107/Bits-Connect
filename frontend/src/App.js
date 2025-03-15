import { useState, useEffect } from "react";

// Components
import Home from "./Components/Home/Home.js";
import Navbar from "./Components/Navbar.js";
import Footer from "./Components/Footer.js";
import ContactPage from "./Components/Contact.js";
import RegistrationPage from "./Components/Register.js";
import SignInPage from "./Components/SignIn.js";
import InternConnect from "./Components/InternConnect/InternConnect.js";
import Dashboard from './Components/Dashboard.js';
import Resume from './Components/resume.js'; // Added import for Resume component

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  
  // Check authentication on initial load
  useEffect(() => {
    // If there's an authToken and we're on home page, redirect to profile
    const isAuthenticated = localStorage.getItem('authToken') !== null;
    if (isAuthenticated && currentPage === "home") {
      setCurrentPage("profile"); // Changed from dashboard to profile
    }
  }, []);

  // Function to handle navigation
  const navigateTo = (page) => {
    // Check if trying to access protected route
    if (page === "profile" || page === "dashboard") { // Added profile as protected route
      const isAuthenticated = localStorage.getItem('authToken') !== null;
      if (!isAuthenticated) {
        // Redirect to sign in if not authenticated
        setCurrentPage("signIn");
        return;
      }
    }
    setCurrentPage(page);
  };

  // Handle successful authentication
  const handleAuthSuccess = (token) => {
    localStorage.setItem('authToken', token);
    setCurrentPage("profile"); // Changed from dashboard to profile
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setCurrentPage("home");
  };

  // Render the appropriate component based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "contact":
        return <ContactPage />;
      case "Register":
        return <RegistrationPage onRegisterSuccess={handleAuthSuccess} />;
      case "signIn":
        return <SignInPage onSignInSuccess={handleAuthSuccess} />;
      case "InternConnect":
        return <InternConnect />;
      case "dashboard":
        return <Dashboard onLogout={handleLogout} />;
      case "profile": // Added new case for profile/resume page
        return <Resume onLogout={handleLogout} />;
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <>
      <div>
        <Navbar navigateTo={navigateTo} currentPage={currentPage} />
        {renderPage()}
        <Footer />
      </div>
    </>
  );
}

export default App;
