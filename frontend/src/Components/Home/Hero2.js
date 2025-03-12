import React from 'react';
import backgroundImage from '../../Assets/HP3.png'; // Update with correct path

const BITSiansSection = () => {
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
                            src={backgroundImage}
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
            
            {/* Text content - centered with proper styling */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '850px',
                textAlign: 'center',
                padding: '0 2rem'
            }}>
                <p style={{
                    color: 'white',
                    fontSize: '1.75rem',
                    lineHeight: 1.6,
                    fontWeight: '300',
                    fontFamily: 'Inter, Arial, sans-serif', // Using a thin modern font
                    margin: 0,
                    letterSpacing: '0.02em'
                }}>
                    BITSians excel in technical skills, innovation, and adaptability,
                    <br />
                    making them ideal for internships and roles.
                    <br />
                    Their strong academic foundation and practical experience
                    <br />
                    drive innovation and success for organizations.
                </p>
            </div>
        </div>
    );
};

export default BITSiansSection;