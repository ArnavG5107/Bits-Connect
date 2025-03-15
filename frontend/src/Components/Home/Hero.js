import React, { useState } from 'react';
import IB from '../../Assets/HP2.png';

const Hero = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [formData, setFormData] = useState({
        companyName: '',
        contactEmail: '',
        contactPhone: '',
        positionTitle: '',
        prerequisites: '',
        duration: '',
        stipend: '',
        location: '',
        description: '',
        companyLogo: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                companyLogo: file
            }));
            
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        
        try {
            // Convert image to base64 if it exists
            let companyLogoBase64 = null;
            if (formData.companyLogo) {
                companyLogoBase64 = await convertFileToBase64(formData.companyLogo);
            }
            
            // Prepare data for submission in the format the backend expects
            const dataToSubmit = {
                companyName: formData.companyName,
                contactEmail: formData.contactEmail,
                contactPhone: formData.contactPhone,
                positionTitle: formData.positionTitle,
                prerequisites: formData.prerequisites,
                description: formData.description,
                duration: formData.duration || null,
                stipend: formData.stipend || null,
                location: formData.location || null,
                companyLogo: companyLogoBase64
            };
            
            // Send data to backend API
            const response = await fetch('http://localhost:5000/api/internships', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'  // Explicitly request JSON response
                },
                body: JSON.stringify(dataToSubmit),
                credentials: 'include'  // Include credentials if you're using sessions/cookies
            });
            
            // Check if the response is JSON by looking at content-type header
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to submit internship details');
                } else {
                    // If not JSON, get the text and throw that as an error
                    const errorText = await response.text();
                    console.error('Non-JSON error response:', errorText);
                    throw new Error('Server error. Please try again later.');
                }
            }
            
            // Only try to parse JSON if we have a JSON response
            let result;
            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
                console.log('Success:', result);
            } else {
                const responseText = await response.text();
                console.log('Success (non-JSON):', responseText);
                result = { success: true };
            }
            
            alert('Thank you! Your internship details have been submitted successfully.');
            
            // Reset form after successful submission
            setShowPopup(false);
            setFormData({
                companyName: '',
                contactEmail: '',
                contactPhone: '',
                positionTitle: '',
                prerequisites: '',
                duration: '',
                stipend: '',
                location: '',
                description: '',
                companyLogo: null
            });
            setImagePreview(null);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitError(error.message || 'An error occurred while submitting the form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper function to convert file to base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

  // Common style for input fields
  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white", // Ensuring white background
    color: "#333", // Darker text for better contrast
    fontSize: "1rem", // Ensuring readable font size
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={IB}
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      {/* Rest of your JSX remains unchanged */}
      {/* ... */}
      
      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />

      {/* Content - Centered with matching sizes */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 2rem",
          zIndex: 30,
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2.75rem",
              fontWeight: "bold",
              color: "white",
              textTransform: "uppercase",
              letterSpacing: "1px",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
            }}
          >
            EMPOWERING BITSIANS WITH REAL WORLD OPPORTUNITIES
          </h1>

          <p
            style={{
              fontSize: "1.25rem",
              color: "white",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            Connect with top talent from BITS Pilani. Register your company and
            offer internships today!
          </p>

          <button
            onClick={() => setShowPopup(true)}
            style={{
              backgroundColor: "#5eead4",
              color: "#1e3a8a",
              padding: "0.5rem 1.5rem",
              borderRadius: "9999px",
              fontWeight: "500",
              textTransform: "uppercase",
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
              border: "none",
              cursor: "pointer",
            }}
          >
            OFFER AN INTERNSHIP
          </button>
        </div>
      </div>

      {/* Display error if submission failed */}
      {submitError && (
        <div style={{
          position: "fixed",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          padding: "0.75rem 1.25rem",
          borderRadius: "4px",
          zIndex: 1000,
          maxWidth: "90%",
          textAlign: "center"
        }}>
          {submitError}
        </div>
      )}

      {/* Popup Form */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "2rem",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                }}
              >
                Internship Details
              </h2>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Form fields remain unchanged */}
              {/* ... */}
              {/* Company Name */}
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Position Title *
                </label>
                <input
                  type="text"
                  name="positionTitle"
                  value={formData.positionTitle}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Prerequisites *
                </label>
                <textarea
                  name="prerequisites"
                  value={formData.prerequisites}
                  onChange={handleChange}
                  required
                  rows="3"
                  style={inputStyle}
                  placeholder="Skills, qualifications, etc."
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="e.g., 3 months"
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Stipend
                  </label>
                  <input
                    type="text"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="e.g., ₹15,000/month"
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="e.g., Remote, Hyderabad, etc."
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  style={inputStyle}
                  placeholder="Provide details about the internship position"
                />
              </div>

              {/* Company Logo Upload */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Company Logo
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ ...inputStyle, padding: "0.5rem" }}
                  />
                  {imagePreview && (
                    <div
                      style={{
                        marginTop: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#666",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Preview:
                      </p>
                      <img
                        src={imagePreview}
                        alt="Company Logo Preview"
                        style={{
                          maxWidth: "150px",
                          maxHeight: "80px",
                          objectFit: "contain",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData((prev) => ({
                            ...prev,
                            companyLogo: null,
                          }));
                        }}
                        style={{
                          marginTop: "0.5rem",
                          backgroundColor: "#f3f4f6",
                          border: "none",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Show error message if there is one */}
              {submitError && (
                <div
                  style={{
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    padding: "0.75rem",
                    borderRadius: "4px",
                    marginBottom: "1rem",
                    fontSize: "0.875rem",
                  }}
                >
                  {submitError}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "4px",
                    backgroundColor: "#f3f4f6",
                    border: "none",
                    fontWeight: "500",
                    cursor: "pointer",
                    color: "#333",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "4px",
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    border: "none",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
