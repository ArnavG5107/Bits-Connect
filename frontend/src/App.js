import { useState } from "react";
import Home from "./Components/Home/Home.js";
import Navbar from "./Components/Navbar.js";
import Footer from "./Components/Footer.js";
import ContactPage from "./Components/Contact.js";
import RegistrationPage from "./Components/Register.js";
import SignInPage from "./Components/SignIn.js";
import InternConnect from "./Components/InternConnect/ic.js";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Function to handle navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Render the appropriate component based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "contact":
        return <ContactPage />;
      case "Register":
        return <RegistrationPage />;
      case "InternConnect":
        return <InternConnect />;
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <>
      <div>
        <Navbar navigateTo={navigateTo} />
        {renderPage()}
        <Footer />
      </div>
    </>
  );
}

export default App;