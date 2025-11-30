"use client";
import Link from 'next/link';
import { ArrowLeft, Lock, Mail, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await signIn('credentials', {
            username: email,
            password: password,
            role: 'admin',
            redirect: false,
        });

        if (res?.error) {
            setError('Invalid email or password');
            setLoading(false);
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8f9fa',
            padding: '2rem'
        }}>
            <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '450px',
                position: 'relative'
            }}>
                <Link href="/" style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    color: '#888',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.9rem'
                }}>
                    <ArrowLeft size={16} /> Back
                </Link>

                <div style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '0.5rem' }}>Admin Login</h1>
                    <p style={{ color: '#888' }}>Sign in to manage your society</p>
                </div>

                {error && (
                    <div style={{ background: '#ffe5e5', color: '#ff4d4f', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} color="#aaa" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="email"
                                placeholder="admin@society.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    background: '#fcfcfc'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: '#555' }}>Password</label>
                            <Link href="/forgot-password" style={{ fontSize: '0.9rem', color: '#7B61FF' }}>Forgot?</Link>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} color="#aaa" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    background: '#fcfcfc'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: '#1a2b4b',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: '1rem',
                            boxShadow: '0 4px 15px rgba(26, 43, 75, 0.2)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#888' }}>
                    Don't have an account? <Link href="#" style={{ color: '#7B61FF', fontWeight: '600' }}>Contact Super Admin</Link>
                </div>
            </div>
        </div>
    );
}
