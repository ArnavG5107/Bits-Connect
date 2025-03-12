import React, { useState, useMemo, useCallback } from "react";
// Changed the import to handle potential missing asset more gracefully
import { default as bitslogo } from "../Assets/bc.jpg"; // Fallback to empty string if import fails

const MenuIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Navbar = ({ navigateTo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Navigation items - removed Home from the list
  const navItems = useMemo(() => [
    { name: "Intern-Connect", page: "InternConnect" },
    { name: "Contact", page: "contact" },
    { name: "Register Now", page: "Register" },
  ], []);

  // Close menu function
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Handle image error more gracefully
  const handleImageError = useCallback((e) => {
    console.error("Image failed to load!");
    setImgError(true);
  }, []);

  // Handle navigation
  const handleNavigation = useCallback((page) => {
    navigateTo(page);
    closeMenu();
  }, [navigateTo, closeMenu]);

  return (
    <nav className="fixed w-full z-50 bg-blue-900/80 backdrop-blur-md border-b border-white/20">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo - functions as home button */}
        <div
          onClick={() => handleNavigation("home")}
          className="cursor-pointer transition-opacity duration-500 ease-in-out opacity-100 transform translate-x-0"
          style={{ animationName: 'fadeInLeft', animationDuration: '0.5s' }}
          aria-label="Go to home page"
          role="button"
          tabIndex={0}
        >
          {!imgError ? (
            <img
              src={bitslogo}
              alt="BTS Connect Logo - Home"
              className="h-14 w-auto"
              onError={handleImageError}
            />
          ) : (
            <div className="h-14 w-14 flex items-center justify-center text-white font-bold">
              LOGO
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <div
              key={item.name}
              onClick={() => handleNavigation(item.page)}
              className="cursor-pointer text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-opacity duration-300 ease-in-out opacity-100 transform translate-y-0"
              style={{ 
                animationName: 'fadeInDown', 
                animationDuration: '0.3s',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
              role="button"
              tabIndex={0}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-gray-300 p-2 transition-transform duration-200 hover:scale-110 active:scale-95"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out"
            onClick={closeMenu}
          />

          {/* Menu Items */}
          <div
            className="md:hidden absolute w-full bg-blue-900/50 backdrop-blur-lg border-b border-white/10 z-50 transition-all duration-300 ease-in-out"
            style={{ 
              animation: 'slideDown 0.3s forwards',
              maxHeight: isOpen ? '1000px' : '0',
              overflow: 'hidden'
            }}
          >
            {navItems.map((item, index) => (
              <div
                key={item.name}
                onClick={() => handleNavigation(item.page)}
                className="block cursor-pointer text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out"
                style={{ 
                  animation: 'fadeInUp 0.3s forwards',
                  animationDelay: `${index * 0.1}s`
                }}
                role="button"
                tabIndex={0}
              >
                {item.name}
              </div>
            ))}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;