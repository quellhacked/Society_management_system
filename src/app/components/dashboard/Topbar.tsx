"use client";
import { Search, Bell, ChevronDown, User, Settings, LogOut, Menu } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
    const { data: session } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header style={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            background: '#ffffff',
            borderBottom: '1px solid #f0f0f0',
            position: 'relative'
        }}>
            {/* Mobile Menu Button */}
            <button
                className="mobile-menu-btn"
                onClick={onMenuClick}
                style={{ marginRight: '1rem', display: 'flex', alignItems: 'center' }}
            >
                <Menu size={24} color="#1a2b4b" />
            </button>
            {/* Search */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'transparent',
                width: '300px'
            }}>
                <Search size={20} color="#999" />
                <input
                    type="text"
                    placeholder="Search..."
                    style={{
                        border: 'none',
                        outline: 'none',
                        fontSize: '0.95rem',
                        color: '#555',
                        width: '100%'
                    }}
                />
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Bell size={20} color="#999" />
                    <span style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-1px',
                        width: '8px',
                        height: '8px',
                        background: '#FF5B5B',
                        borderRadius: '50%',
                        border: '1px solid #fff'
                    }}></span>
                </button>

                <div
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: '#eee',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#888'
                        }}>
                            {session?.user?.image ? (
                                <img src={session.user.image} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <User size={20} />
                            )}
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#555' }}>
                            {session?.user?.name || 'Guest User'}
                        </span>
                        <ChevronDown size={16} color="#999" />
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            width: '200px',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                            padding: '0.5rem',
                            zIndex: 100,
                            border: '1px solid #f0f0f0',
                            marginTop: '10px'
                        }}>
                            <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', marginBottom: '0.5rem' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a2b4b' }}>{session?.user?.name}</p>
                                <p style={{ fontSize: '0.8rem', color: '#888' }}>{session?.user?.email}</p>
                            </div>

                            <Link href="/dashboard/profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.8rem 1rem', color: '#555', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.2s' }} className="hover:bg-gray-50">
                                <User size={16} /> Profile
                            </Link>
                            <Link href="/dashboard/settings" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.8rem 1rem', color: '#555', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.2s' }} className="hover:bg-gray-50">
                                <Settings size={16} /> Settings
                            </Link>

                            <div style={{ borderTop: '1px solid #f5f5f5', margin: '0.5rem 0' }}></div>

                            <button
                                onClick={() => signOut()}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '0.8rem 1rem',
                                    color: '#ff4d4f',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    textAlign: 'left',
                                    fontSize: '0.9rem'
                                }}
                                className="hover:bg-red-50"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
