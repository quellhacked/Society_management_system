export default function About() {
    return (
        <section style={{ padding: '5rem 2rem', background: '#f8f9fa' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1.5rem' }}>
                        Modern Living Requires Modern Management
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                        Gone are the days of manual ledgers and notice boards. Our Society Management System brings your community into the digital age.
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '2rem' }}>
                        Whether you are a committee member trying to streamline operations or a resident looking for transparency, our platform bridges the gap with intuitive technology.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                            <h4 style={{ fontSize: '2rem', fontWeight: '700', color: '#00D09C' }}>500+</h4>
                            <p style={{ color: '#666' }}>Happy Residents</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '2rem', fontWeight: '700', color: '#00D09C' }}>98%</h4>
                            <p style={{ color: '#666' }}>Efficiency Boost</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '2rem', fontWeight: '700', color: '#00D09C' }}>24/7</h4>
                            <p style={{ color: '#666' }}>Support</p>
                        </div>
                    </div>
                </div>
                <div style={{
                    height: '400px',
                    background: 'linear-gradient(135deg, #1a2b4b 0%, #2a4b7b 100%)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-50px',
                        right: '-50px',
                        width: '200px',
                        height: '200px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%'
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '-30px',
                        left: '-30px',
                        width: '150px',
                        height: '150px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%'
                    }} />
                    <h3 style={{ fontSize: '2rem', fontWeight: '600', textAlign: 'center', padding: '2rem' }}>
                        "Transforming Communities,<br />One Click at a Time"
                    </h3>
                </div>
            </div>
        </section>
    );
}
