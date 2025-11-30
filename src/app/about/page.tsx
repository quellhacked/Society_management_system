import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Target, Shield } from 'lucide-react';

export default function AboutPage() {
    return (
        <main style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            <Navbar />

            {/* Header */}
            <section style={{ background: '#1a2b4b', color: 'white', padding: '6rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>About Us</h1>
                <p style={{ fontSize: '1.2rem', color: '#a0aec0', maxWidth: '600px', margin: '0 auto' }}>
                    Building stronger communities through technology, transparency, and trust.
                </p>
            </section>

            {/* Mission & Vision */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '60px', height: '60px', background: '#e6f7ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0099ff', marginBottom: '1.5rem' }}>
                            <Target size={32} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1rem' }}>Our Mission</h2>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            To simplify the complexities of society management by providing a unified, user-friendly platform that empowers residents and committees alike. We aim to reduce administrative burden and foster a harmonious living environment.
                        </p>
                    </div>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '60px', height: '60px', background: '#fff0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4d4f', marginBottom: '1.5rem' }}>
                            <Shield size={32} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1rem' }}>Our Vision</h2>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            To be the leading standard in community management technology, creating smart, secure, and connected societies across the globe where every resident feels valued and safe.
                        </p>
                    </div>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '60px', height: '60px', background: '#f0fdf4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', marginBottom: '1.5rem' }}>
                            <Users size={32} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1rem' }}>Our Values</h2>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            <strong>Transparency:</strong> Open communication and clear financial records.<br />
                            <strong>Innovation:</strong> Constantly improving with the latest tech.<br />
                            <strong>Community:</strong> Putting people first in everything we do.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section style={{ background: 'white', padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem' }}>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1.5rem' }}>Our Story</h2>
                        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                            Founded in 2023, Society Management System started with a simple idea: why is managing our homes so complicated? From lost notices to confusing maintenance bills, we saw a need for change.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
                            What began as a small project for a single apartment complex has now grown into a robust platform trusted by over 500 communities. We are a team of passionate developers, designers, and community managers dedicated to making your life easier.
                        </p>
                    </div>
                    <div style={{ flex: 1, height: '400px', background: '#f0f2f5', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                        {/* Placeholder for Team Image */}
                        <span>Team Photo</span>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
