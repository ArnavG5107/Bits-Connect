import React, { useState } from 'react';
import IB from '../../Assets/HP2.png';

const Hero = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        contactEmail: '',
        contactPhone: '',
        positionTitle: '',
        prerequisites: '',
        duration: '',
        stipend: '',
        location: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Internship details submitted:', formData);
        // Here you would normally send this data to your backend
        alert('Thank you! Your internship details have been submitted.');
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
            description: ''
        });
    };

    // Common style for input fields
    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: 'white', // Ensuring white background
        color: '#333', // Darker text for better contrast
        fontSize: '1rem' // Ensuring readable font size
    };

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden'
        }}>
            {/* Background Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }}>
                <img
                    src={IB}
                    alt="Background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </div>
            
            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }} />
            
            {/* Content - Centered with matching sizes */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 2rem',
                zIndex: 30
            }}>
                <div style={{
                    maxWidth: '800px',
                    textAlign: 'center'
                }}>
                    <h1 style={{
                        fontSize: '2.75rem',
                        fontWeight: 'bold',
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        lineHeight: 1.2,
                        marginBottom: '1.5rem'
                    }}>
                        EMPOWERING BITSIANS WITH REAL WORLD OPPORTUNITIES
                    </h1>
                    
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'white',
                        lineHeight: 1.6,
                        marginBottom: '2rem'
                    }}>
                        Connect with top talent from BITS Pilani. Register your company and offer internships today!
                    </p>
                    
                    <button 
                        onClick={() => setShowPopup(true)}
                        style={{
                            backgroundColor: '#5eead4',
                            color: '#1e3a8a',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '9999px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            fontSize: '0.875rem',
                            letterSpacing: '0.05em',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        OFFER AN INTERNSHIP
                    </button>
                </div>
            </div>

            {/* Popup Form */}
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 100
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '2rem',
                        width: '90%',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#1e3a8a'
                            }}>
                                Internship Details
                            </h2>
                            <button 
                                onClick={() => setShowPopup(false)}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#333'
                                }}>
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

                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 1fr', 
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
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
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
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

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#333'
                                }}>
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

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#333'
                                }}>
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

                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 1fr', 
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
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
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
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

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#333'
                                }}>
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

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#333'
                                }}>
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    style={inputStyle}
                                    placeholder="Provide details about the internship position"
                                />
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem'
                            }}>
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '4px',
                                        backgroundColor: '#f3f4f6',
                                        border: 'none',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        color: '#333'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '4px',
                                        backgroundColor: '#1e3a8a',
                                        color: 'white',
                                        border: 'none',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Submit
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
