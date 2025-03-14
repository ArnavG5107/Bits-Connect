import React, { useState } from 'react';

// Custom SVG Icons instead of React Icons
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Clear errors for this field when user makes changes
    if (errors[id]) {
      setErrors({ ...errors, [id]: null });
    }
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched({ ...touched, [id]: true });
    validateField(id, formData[id]);
  };

  const validateField = (field, value) => {
    let newErrors = { ...errors };
    
    switch (field) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'First name is required';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          newErrors.email = 'Invalid email address';
        }
        break;
      case 'phone':
        if (value && !/^[0-9]{10}$/.test(value)) {
          newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        break;
      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Please enter your message';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  const validateForm = () => {
    const fields = ['firstName', 'lastName', 'email', 'message'];
    let formIsValid = true;
    
    // Touch all fields to show errors
    let allTouched = {};
    fields.forEach(field => {
      allTouched[field] = true;
      if (!validateField(field, formData[field])) {
        formIsValid = false;
      }
    });
    
    setTouched({ ...touched, ...allTouched });
    return formIsValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Check the console for submitted data!');
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background with multiple layers */}
      <div className="absolute inset-0 bg-black">
        {/* Full background image - geometric lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: "url('https://via.placeholder.com/1920x1080')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>
        
        {/* Second background image (2/3 of the screen) - right side */}
        <div className="absolute right-0 top-0 w-2/3 h-full">
          <div className="w-full h-full">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full opacity-30">
              <defs>
                <radialGradient id="blob1" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="blob2" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#DB2777" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="blob3" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="40" cy="40" r="30" fill="url(#blob1)" />
              <circle cx="170" cy="40" r="40" fill="url(#blob3)" />
              <circle cx="70" cy="160" r="50" fill="url(#blob1)" />
              <circle cx="160" cy="170" r="30" fill="url(#blob2)" />
              <circle cx="100" cy="90" r="20" fill="url(#blob2)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 py-16">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">Any question or remarks? Just write us a message!</p>
        </div>

        {/* Contact Card */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Contact Information */}
              <div className="bg-gray-800/80 p-8 md:w-2/5">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                
                <div className="space-y-6 mt-12">
                  <div className="flex items-center text-gray-300">
                    <span className="text-xl mr-4">
                      <EmailIcon />
                    </span>
                    <a href="mailto:contact@ecell.com" className="hover:text-white transition-colors">contact@ecell.com</a>
                  </div>
                  
                  <div className="flex items-start text-gray-300">
                    <span className="text-xl mr-4 mt-1 flex-shrink-0">
                      <LocationIcon />
                    </span>
                    <p>
                      BITS Pilani - Hyderabad Campus, Jawahar
                      <br />
                      Nagar, Kapra Mandal, Medchal District
                      <br />
                      500078
                    </p>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-12 pt-12 border-t border-gray-700">
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <TwitterIcon />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <InstagramIcon />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <LinkedinIcon />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="p-8 md:w-3/5">
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm text-gray-300 mb-1">First Name</label>
                      <input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-transparent border-b ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-600'} py-2 focus:border-blue-500 outline-none text-white`}
                      />
                      {errors.firstName && touched.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm text-gray-300 mb-1">Last Name</label>
                      <input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-transparent border-b ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-600'} py-2 focus:border-blue-500 outline-none text-white`}
                      />
                      {errors.lastName && touched.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-transparent border-b ${errors.email && touched.email ? 'border-red-500' : 'border-gray-600'} py-2 focus:border-blue-500 outline-none text-white`}
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm text-gray-300 mb-1">Phone Number</label>
                      <div className="flex">
                        <span className="text-gray-500 border-b border-gray-600 py-2 pr-2">+91</span>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full bg-transparent border-b ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-600'} py-2 focus:border-blue-500 outline-none text-white`}
                        />
                      </div>
                      {errors.phone && touched.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Message</label>
                    <div className="relative">
                      <span className="absolute text-xs text-gray-500 -top-6">Write your message...</span>
                      <textarea
                        id="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-transparent border-b ${errors.message && touched.message ? 'border-red-500' : 'border-gray-600'} py-2 focus:border-blue-500 outline-none text-white`}
                      ></textarea>
                      {errors.message && touched.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right pt-4">
                    <button
                      type="submit"
                      className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transform transition-all hover:translate-y-px"
                    >
                      <span>Send Message</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2L2 7L7 9L9 14L14 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
