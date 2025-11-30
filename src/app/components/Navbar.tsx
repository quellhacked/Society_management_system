"use client";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem 5%',
            maxWidth: '1440px',
            margin: '0 auto',
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
                    Your Logo
                </span>
            </div>

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

                        {/* Dropdown - Visible on hover (using CSS group-hover logic or state if preferred, but inline styles are tricky for hover. Using simple state approach is safer for React) */}
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
                            borderBottom: '4px solid #1a2b4b', // 3D thickness
                            borderRadius: '25px',
                            color: '#1a2b4b',
                            transition: 'all 0.1s',
                            fontWeight: '700',
                            transform: 'translateY(0)',
                        }}
                            onMouseDown={(e) => {
                                e.currentTarget.style.transform = 'translateY(2px)';
                                e.currentTarget.style.borderBottom = '2px solid #1a2b4b';
                            }}
                            onMouseUp={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderBottom = '4px solid #1a2b4b';
                            }}
                        >Admin Login</Link>
                        <Link href="/resident-login" style={{
                            padding: '0.6rem 1.5rem',
                            background: 'var(--gradient-accent)',
                            color: 'white',
                            borderRadius: '25px',
                            boxShadow: '0 4px 0 #00c6fb, 0 10px 10px rgba(0,0,0,0.1)', // 3D shadow
                            transition: 'all 0.1s',
                            transform: 'translateY(0)',
                        }}
                            onMouseDown={(e) => {
                                e.currentTarget.style.transform = 'translateY(4px)';
                                e.currentTarget.style.boxShadow = '0 0 0 #00c6fb, 0 0 0 rgba(0,0,0,0)';
                            }}
                            onMouseUp={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 0 #00c6fb, 0 10px 10px rgba(0,0,0,0.1)';
                            }}
                        >Residental Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
