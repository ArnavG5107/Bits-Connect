import React, { useState } from 'react';
import BG from '../Assets/figmabg.png';

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
    if (errors[id]) setErrors({ ...errors, [id]: null });
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
        if (!value.trim()) newErrors.firstName = 'First name is required';
        break;
      case 'lastName':
        if (!value.trim()) newErrors.lastName = 'Last name is required';
        break;
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          newErrors.email = 'Invalid email address';
        }
        break;
      case 'message':
        if (!value.trim()) newErrors.message = 'Please enter your message';
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
    let allTouched = {};
    
    fields.forEach(field => {
      allTouched[field] = true;
      if (!validateField(field, formData[field])) formIsValid = false;
    });
    
    setTouched({ ...touched, ...allTouched });
    return formIsValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-xl text-gray-300 mb-8">Any questions or remarks? Write us a message!</p>

        {/* Contact Card */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Contact Information */}
              <div className="bg-gray-800/80 p-8 md:w-2/5">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                
                <div className="space-y-6 mt-8">
                  <div className="flex items-center text-gray-300">
                    <span className="mr-4">📧</span>
                    <a href="mailto:contact@ecell.com" className="hover:text-white">contact@ecell.com</a>
                  </div>
                  
                  <div className="flex items-start text-gray-300">
                    <span className="mr-4 mt-1">📍</span>
                    <p>BITS Pilani - Hyderabad Campus<br />500078</p>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <div className="flex space-x-4 text-gray-400">
                    <a href="#" className="hover:text-white">🐦</a>
                    <a href="#" className="hover:text-white">📸</a>
                    <a href="#" className="hover:text-white">💼</a>
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
                          className="w-full bg-transparent border-b border-gray-600 py-2 focus:border-blue-500 outline-none text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-transparent border-b ${errors.message && touched.message ? 'border-red-500' : 'border-gray-600'} py-2 focus:border-blue-500 outline-none text-white`}
                      placeholder="Write your message..."
                    ></textarea>
                    {errors.message && touched.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <div className="text-right pt-4">
                    <button
                      type="submit"
                      className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                    >
                      Send Message
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
