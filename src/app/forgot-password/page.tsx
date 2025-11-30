"use client";
import Link from 'next/link';
import { ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
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
                <Link href="/resident-login" style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    color: '#888',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.9rem',
                    textDecoration: 'none'
                }}>
                    <ArrowLeft size={16} /> Back to Login
                </Link>

                <div style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '0.5rem' }}>Forgot Password?</h1>
                    <p style={{ color: '#888' }}>Enter your email to reset your password</p>
                </div>

                {success ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{
                            width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                            color: '#16a34a'
                        }}>
                            <CheckCircle size={40} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '0.5rem' }}>Check your email</h3>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            We have sent password reset instructions to <strong>{email}</strong>
                        </p>
                        <button
                            onClick={() => setSuccess(false)}
                            style={{
                                marginTop: '2rem',
                                background: 'none',
                                border: 'none',
                                color: '#4F46E5',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Try another email
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} color="#aaa" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
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

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                marginTop: '0.5rem',
                                boxShadow: '0 4px 15px rgba(118, 75, 162, 0.3)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
