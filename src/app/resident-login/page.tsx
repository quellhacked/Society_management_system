"use client";
import Link from 'next/link';
import { ArrowLeft, Phone, Lock, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResidentLogin() {
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending OTP
        setTimeout(() => {
            setStep(2);
            setLoading(false);
        }, 1000);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await signIn('credentials', {
            username: phone,
            password: otp, // Using password field for OTP in mock
            role: 'resident',
            redirect: false,
        });

        if (res?.error) {
            setError('Invalid OTP');
            setLoading(false);
        } else {
            router.push('/resident-dashboard');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e6f7ff 100%)',
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
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '0.5rem' }}>Resident Login</h1>
                    <p style={{ color: '#888' }}>Access your home dashboard</p>
                </div>

                {error && (
                    <div style={{ background: '#ffe5e5', color: '#ff4d4f', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={20} color="#aaa" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                                background: 'var(--gradient-accent)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                marginTop: '1rem',
                                boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>Enter OTP</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} color="#aaa" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="password"
                                    placeholder="Enter 4-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    maxLength={4}
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
                            <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                                <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#0099ff', cursor: 'pointer', fontSize: '0.9rem' }}>Change Number</button>
                                <Link href="/forgot-password" style={{ fontSize: '0.9rem', color: '#0099ff', textDecoration: 'none' }}>Forgot Password?</Link>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                background: 'var(--gradient-accent)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                marginTop: '1rem',
                                boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Verify & Login'}
                        </button>
                    </form>
                )}

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#888' }}>
                    First time here? <Link href="/register" style={{ color: '#4facfe', fontWeight: '600' }}>Register your flat</Link>
                </div>
            </div>
        </div>
    );
}
