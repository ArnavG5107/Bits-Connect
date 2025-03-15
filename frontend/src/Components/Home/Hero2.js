import React from 'react';
import backgroundImage from '../../Assets/HP3.png'; // Update with correct path

const BITSiansSection = () => {
    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '50vh', // Changed to 50% of viewport height
            overflow: 'hidden'
        }}>
            {/* Background Image - Showing only top 50% */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '200%' // Double the height to show only top half
            }}>
                <img
                    src={backgroundImage}
                    alt="Background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top' // Align to top of image
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
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                maxWidth: '850px',
                textAlign: 'center',
                padding: '0 2rem',
                width: '100%'
            }}>
                <p style={{
                    color: 'white',
                    fontSize: '1.75rem',
                    lineHeight: 1.6,
                    fontWeight: '300',
                    fontFamily: 'Inter, Arial, sans-serif',
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
