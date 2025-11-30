import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{ background: '#1a2b4b', color: 'white', padding: '4rem 2rem 1rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                {/* Brand */}
                <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#00D09C' }}>SocietyManager</h3>
                    <p style={{ color: '#a0aec0', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        Simplifying society management with smart, secure, and seamless solutions for modern communities.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <SocialIcon icon={<Facebook size={20} />} />
                        <SocialIcon icon={<Twitter size={20} />} />
                        <SocialIcon icon={<Instagram size={20} />} />
                        <SocialIcon icon={<Linkedin size={20} />} />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                        <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Features</a></li>
                        <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>About Us</a></li>
                        <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contact</a></li>
                        <li><a href="/admin-login" style={{ color: '#a0aec0', textDecoration: 'none' }}>Admin Login</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Contact Us</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a0aec0' }}>
                            <Mail size={18} />
                            <span>support@societymanager.com</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a0aec0' }}>
                            <Phone size={18} />
                            <span>+91 98765 43210</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a0aec0' }}>
                            <MapPin size={18} />
                            <span>123, Tech Park, Mumbai, India</span>
                        </div>
                    </div>
                </div>

            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', textAlign: 'center', color: '#718096', fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} Society Management System. All rights reserved.
            </div>
        </footer>
    );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <a href="#" style={{
            width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'background 0.2s'
        }}>
            {icon}
        </a>
    );
}
