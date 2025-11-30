"use client";
import { useState } from 'react';
import { X, CreditCard, Smartphone, Globe, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
    amount: number;
    purpose: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function PaymentModal({ amount, purpose, onClose, onSuccess }: PaymentModalProps) {
    const [method, setMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle');

    const handlePay = () => {
        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            setStatus('success');
            setTimeout(() => {
                onSuccess();
            }, 1500);
        }, 2000);
    };

    if (status === 'success') {
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
            }}>
                <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', textAlign: 'center', animation: 'popIn 0.3s ease' }}>
                    <CheckCircle size={64} color="#00D09C" style={{ margin: '0 auto 1rem' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a2b4b' }}>Payment Successful!</h2>
                    <p style={{ color: '#666' }}>Transaction ID: TXN-{Math.floor(Math.random() * 1000000)}</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div style={{
                background: 'white', width: '90%', maxWidth: '450px', borderRadius: '24px', overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)', animation: 'slideUp 0.3s ease'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a2b4b' }}>Secure Payment</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><X size={20} /></button>
                </div>

                <div style={{ padding: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Paying for {purpose}</p>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a2b4b' }}>₹ {amount.toLocaleString()}</h1>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        <button
                            onClick={() => setMethod('card')}
                            style={{
                                padding: '1rem', borderRadius: '12px', border: method === 'card' ? '2px solid #7B61FF' : '1px solid #eee',
                                background: method === 'card' ? '#F4F1FF' : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                            }}
                        >
                            <CreditCard size={24} color={method === 'card' ? '#7B61FF' : '#888'} />
                            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: method === 'card' ? '#7B61FF' : '#666' }}>Card</span>
                        </button>
                        <button
                            onClick={() => setMethod('upi')}
                            style={{
                                padding: '1rem', borderRadius: '12px', border: method === 'upi' ? '2px solid #7B61FF' : '1px solid #eee',
                                background: method === 'upi' ? '#F4F1FF' : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                            }}
                        >
                            <Smartphone size={24} color={method === 'upi' ? '#7B61FF' : '#888'} />
                            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: method === 'upi' ? '#7B61FF' : '#666' }}>UPI</span>
                        </button>
                        <button
                            onClick={() => setMethod('netbanking')}
                            style={{
                                padding: '1rem', borderRadius: '12px', border: method === 'netbanking' ? '2px solid #7B61FF' : '1px solid #eee',
                                background: method === 'netbanking' ? '#F4F1FF' : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                            }}
                        >
                            <Globe size={24} color={method === 'netbanking' ? '#7B61FF' : '#888'} />
                            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: method === 'netbanking' ? '#7B61FF' : '#666' }}>Net Banking</span>
                        </button>
                    </div>

                    <button
                        onClick={handlePay}
                        disabled={loading}
                        style={{
                            width: '100%', padding: '1rem', background: '#1a2b4b', color: 'white', border: 'none', borderRadius: '12px',
                            fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
                            boxShadow: '0 4px 15px rgba(26, 43, 75, 0.2)'
                        }}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : `Pay ₹ ${amount.toLocaleString()}`}
                    </button>
                </div>
            </div>
        </div>
    );
}
