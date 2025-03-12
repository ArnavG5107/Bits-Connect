import React from 'react';
import IB from '../../Assets/HP2.png';

const Hero = () => {
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
                    
                    <button style={{
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
                    }}>
                        OFFER AN INTERNSHIP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;