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
  
  // Check for page reload and set current page to home
  useEffect(() => {
    // Check if this is a page reload
    const pageAccessedByReload = (
      (window.performance.navigation && window.performance.navigation.type === 1) ||
      window.performance.getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
    );
    
    // If page was reloaded, set to home page regardless of previous state
    if (pageAccessedByReload) {
      setCurrentPage("home");
      return;
    }
    
    // If not a reload and there's an authToken, proceed with normal authentication check
    const isAuthenticated = localStorage.getItem('authToken') !== null;
    if (isAuthenticated && currentPage === "home") {
      setCurrentPage("profile");
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
    setCurrentPage("profile");
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
        return <InternConnect key="internConnect" />;
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
