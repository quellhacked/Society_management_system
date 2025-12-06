"use client";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem 5%',
            maxWidth: '1440px',
            margin: '0 auto',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Logo Icon */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2L2 10L16 18L30 10L16 2Z" fill="#C04BF2" />
                    <path d="M2 10V22L16 30V18L2 10Z" fill="#8A2BE2" />
                    <path d="M30 10V22L16 30V18L30 10Z" fill="#C04BF2" fillOpacity="0.6" />
                </svg>
                <span style={{
                    fontWeight: '700',
                    fontSize: '1.2rem',
                    color: '#1a2b4b'
                }}>
                    SocietyPlus
                </span>
            </div>

            {/* Desktop Menu */}
            <div style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
                fontWeight: '600',
                color: '#555',
                fontSize: '0.9rem'
            }} className="desktop-menu">
                <Link href="/" style={{ color: '#1a2b4b' }}>Home</Link>
                <Link href="/about">About Us</Link>
                <Link href="/services">Services</Link>

                {session ? (
                    <div
                        style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                        className="group"
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: '#e6f7ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1a2b4b'
                            }}>
                                {session.user?.name?.charAt(0) || 'U'}
                            </div>
                            <span style={{ color: '#1a2b4b' }}>{session.user?.name}</span>
                        </div>

                        <button
                            onClick={() => signOut()}
                            style={{
                                padding: '0.5rem 1rem',
                                border: '1px solid #ff4d4f',
                                borderRadius: '20px',
                                color: '#ff4d4f',
                                background: 'transparent',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.8rem'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <Link href="/admin-login" style={{
                            padding: '0.6rem 1.5rem',
                            border: '1px solid #1a2b4b',
                            borderRadius: '25px',
                            color: '#1a2b4b',
                            fontWeight: '700',
                        }}>Admin Login</Link>
                        <Link href="/resident-login" style={{
                            padding: '0.6rem 1.5rem',
                            background: 'var(--gradient-accent)',
                            color: 'white',
                            borderRadius: '25px',
                            fontWeight: '700',
                        }}>Resident Login</Link>
                    </>
                )}
            </div>

            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ display: 'none' }}
                className="mobile-tbo-btn" // Hack: creating a reverse logic class in style tag or just inline conditional
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <style jsx>{`
                @media (max-width: 768px) {
                    .mobile-tbo-btn {
                        display: block !important;
                    }
                }
            `}</style>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    right: 0,
                    background: 'white',
                    padding: '2rem',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    borderRadius: '0 0 16px 16px'
                }}>
                    <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)}>About Us</Link>
                    <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
                    <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
                    {!session && (
                        <>
                            <Link href="/admin-login" onClick={() => setIsOpen(false)}>Admin Login</Link>
                            <Link href="/resident-login" onClick={() => setIsOpen(false)}>Resident Login</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
