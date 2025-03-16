import React, { useState } from "react";
import BG from "../Assets/figmabg.png";

// SVG Icons components remain unchanged
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

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
      case "firstName":
        if (!value.trim()) newErrors.firstName = "First name is required";
        break;
      case "lastName":
        if (!value.trim()) newErrors.lastName = "Last name is required";
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          newErrors.email = "Invalid email address";
        }
        break;
      case "message":
        if (!value.trim()) newErrors.message = "Please enter your message";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  const validateForm = () => {
    const fields = ["firstName", "lastName", "email", "message"];
    let formIsValid = true;
    let allTouched = {};

    fields.forEach((field) => {
      allTouched[field] = true;
      if (!validateField(field, formData[field])) formIsValid = false;
    });

    setTouched({ ...touched, ...allTouched });
    return formIsValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus({ type: "", message: "" });

      try {
        // Get the API URL from environment variables or use default
        const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        
        // Using fetch to send data to our Resend-enabled backend
        const response = await fetch(`${baseURL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone || "Not provided",
            message: formData.message,
          }),
        });

        // Handle the response
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to send message');
        }

        console.log("Form submitted successfully:", data);
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully with Resend.",
        });

        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setTouched({});
      } catch (error) {
        console.error("Error submitting form:", error);
        
        // Error handling
        let errorMessage = "There was a problem sending your message with Resend. Please try again later.";
        
        if (error.message) {
          errorMessage = error.message;
        }
        
        setSubmitStatus({
          type: "error",
          message: errorMessage
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Alternative email submission method using mailto approach
  const handleDirectEmailSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const subject = `Contact form from ${formData.firstName} ${formData.lastName}`;
        const body = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}

Message:
${formData.message}
        `;
        
        // Create a mailto link
        const mailtoLink = `mailto:arnavgupta5106@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open the default email client
        window.location.href = mailtoLink;
        
        // Show success message
        setSubmitStatus({
          type: "success",
          message: "Email client opened. Please send the email to complete your message submission.",
        });
      } catch (error) {
        console.error("Error opening email client:", error);
        setSubmitStatus({
          type: "error",
          message: "Unable to open email client. Please try again or send email directly."
        });
      }
    }
  };

  // The JSX render part
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-xl text-gray-300 mb-8">
          Any questions or remarks? Write us a message!
        </p>

        {/* Contact Card */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Contact Information */}
              <div className="bg-gray-800/80 p-8 md:w-2/5">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6 mt-8">
                  <div className="flex items-center text-gray-300">
                    <span className="mr-4">
                      <EmailIcon />
                    </span>
                    <a
                      href="mailto:arnavgupta5107@gmail.com"
                      className="hover:text-white"
                    >
                      arnavgupta5107@gmail.com
                    </a>
                  </div>

                  <div className="flex items-start text-gray-300">
                    <span className="mr-4 mt-1 flex-shrink-0">
                      <LocationIcon />
                    </span>
                    <p>
                      BITS Pilani - Hyderabad Campus
                      <br />
                      500078
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <TwitterIcon />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <LinkedinIcon />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 md:w-3/5">
                {submitStatus.type === "success" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="bg-green-900/30 rounded-full p-4 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-300">{submitStatus.message}</p>
                    <button
                      onClick={() => setSubmitStatus({ type: "", message: "" })}
                      className="mt-6 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDirectEmailSubmit} className="space-y-6">
                    {submitStatus.type === "error" && (
                      <div className="bg-red-900/30 text-red-400 p-4 rounded-lg mb-4">
                        {submitStatus.message}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm text-gray-300 mb-1"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full bg-transparent border-b ${
                            errors.firstName && touched.firstName
                              ? "border-red-500"
                              : "border-gray-600"
                          } py-2 focus:border-blue-500 outline-none text-white`}
                        />
                        {errors.firstName && touched.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                      <label
                          htmlFor="lastName"
                          className="block text-sm text-gray-300 mb-1"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full bg-transparent border-b ${
                            errors.lastName && touched.lastName
                              ? "border-red-500"
                              : "border-gray-600"
                          } py-2 focus:border-blue-500 outline-none text-white`}
                        />
                        {errors.lastName && touched.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm text-gray-300 mb-1"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full bg-transparent border-b ${
                            errors.email && touched.email
                              ? "border-red-500"
                              : "border-gray-600"
                          } py-2 focus:border-blue-500 outline-none text-white`}
                        />
                        {errors.email && touched.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm text-gray-300 mb-1"
                        >
                          Phone Number
                        </label>
                        <div className="flex">
                          <span className="text-gray-500 border-b border-gray-600 py-2 pr-2">
                            +91
                          </span>
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
                      <label
                        htmlFor="message"
                        className="block text-sm text-gray-300 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-transparent border-b ${
                          errors.message && touched.message
                            ? "border-red-500"
                            : "border-gray-600"
                        } py-2 focus:border-blue-500 outline-none text-white`}
                      ></textarea>
                      {errors.message && touched.message && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`py-3 rounded-lg text-white font-medium ${
                          isSubmitting
                            ? "bg-gray-600"
                            : "bg-blue-600 hover:bg-blue-700"
                        } transition-colors flex items-center justify-center flex-1`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Open Email Client"
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        className={`py-3 rounded-lg text-white font-medium ${
                          isSubmitting
                            ? "bg-gray-600"
                            : "bg-green-600 hover:bg-green-700"
                        } transition-colors flex items-center justify-center flex-1`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Send with Resend"
                        )}
                      </button>
                    </div>
                    
                    <p className="text-gray-400 text-xs text-center mt-4">
                      Choose "Open Email Client" to send directly from your email, or "Send with Resend" to use our email service.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
