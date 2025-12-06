import Image from 'next/image';

export default function Hero() {
    return (
        <section className="hero-section" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4rem 5%',
            maxWidth: '1440px',
            margin: '0 auto',
            minHeight: '80vh',
            position: 'relative',
            overflow: 'hidden',
            gap: '2rem'
        }}>
            {/* Left Content */}
            <div style={{ flex: '1', maxWidth: '500px', zIndex: 2 }}>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '700',
                    lineHeight: '1.1',
                    color: '#1a2b4b',
                    marginBottom: '1.5rem'
                }}>
                    Smart Society<br />Management
                </h1>
                <p style={{
                    fontSize: '1rem',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '2.5rem',
                    maxWidth: '400px'
                }}>
                    Experience the future of residential living with our all-in-one platform for billing, security, communication, and more.
                </p>
                <button style={{
                    background: 'var(--gradient-accent)',
                    color: 'white',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                    Get Started
                </button>
            </div>

            {/* Right Content - Illustration */}
            <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '500px',
                }}>
                    <Image
                        src="/hero-illustration.png"
                        alt="Project Management Illustration"
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </div>
            </div>

            {/* Background Shape (Abstract) */}
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '60%',
                height: '80%',
                background: '#1a2b4b',
                borderRadius: '50% 0 0 0',
                zIndex: -1,
                transform: 'rotate(-10deg)',
                opacity: 0.9
            }}></div>
        </section>
    );
}
