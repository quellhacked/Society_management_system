"use client";
import { useState } from 'react';
import { CreditCard, CheckCircle, Clock, Download, History } from 'lucide-react';
import PaymentModal from '../../components/PaymentModal';

const initialBills = [
    { id: 'INV-2025-001', amount: 5500, month: 'November 2025', status: 'Pending', dueDate: '2025-12-05' },
    { id: 'INV-2025-000', amount: 5500, month: 'October 2025', status: 'Paid', dueDate: '2025-11-05', paidOn: '2025-11-03' },
    { id: 'INV-2024-012', amount: 5500, month: 'September 2025', status: 'Paid', dueDate: '2025-10-05', paidOn: '2025-10-04' },
];

export default function ResidentMaintenancePage() {
    const [bills, setBills] = useState(initialBills);
    const [showPayment, setShowPayment] = useState(false);
    const [selectedBill, setSelectedBill] = useState<string | null>(null);

    const initiatePayment = (id: string) => {
        setSelectedBill(id);
        setShowPayment(true);
    };

    const handlePaymentSuccess = () => {
        if (selectedBill) {
            setBills(bills.map(b => b.id === selectedBill ? { ...b, status: 'Paid', paidOn: new Date().toISOString().split('T')[0] } : b));
            setShowPayment(false);
            setSelectedBill(null);
        }
    };

    const pendingBill = bills.find(b => b.status === 'Pending');
    const historyBills = bills.filter(b => b.status === 'Paid');

    return (
        <div>
            {showPayment && pendingBill && (
                <PaymentModal
                    amount={pendingBill.amount}
                    purpose={`Maintenance - ${pendingBill.month}`}
                    onClose={() => setShowPayment(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CreditCard size={28} /> Maintenance & Billing
                </h1>

                {/* Current Due Card */}
                {pendingBill ? (
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        marginBottom: '3rem',
                        border: '1px solid #ffe5e5',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '0.5rem' }}>Current Due</h2>
                            <p style={{ color: '#666', marginBottom: '0.2rem' }}>Invoice: {pendingBill.id}</p>
                            <p style={{ color: '#666' }}>For Month: <span style={{ fontWeight: '600' }}>{pendingBill.month}</span></p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '0.5rem' }}>
                                ₹ {pendingBill.amount}
                            </div>
                            <p style={{ color: '#ff4d4f', fontWeight: '600', marginBottom: '1rem' }}>Due by {pendingBill.dueDate}</p>
                            <button
                                onClick={() => initiatePayment(pendingBill.id)}
                                style={{
                                    padding: '0.8rem 2rem',
                                    background: '#1a2b4b',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(26, 43, 75, 0.2)'
                                }}
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        background: '#E6FAFA',
                        borderRadius: '16px',
                        padding: '2rem',
                        marginBottom: '3rem',
                        textAlign: 'center',
                        color: '#00D09C'
                    }}>
                        <CheckCircle size={48} style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>All Dues Cleared!</h2>
                        <p>You have no pending maintenance bills.</p>
                    </div>
                )}

                {/* Payment History */}
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <History size={24} /> Payment History
                </h2>

                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8f9fa' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Invoice ID</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Month</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Amount</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Paid On</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyBills.map((bill) => (
                                <tr key={bill.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600', color: '#1a2b4b' }}>{bill.id}</td>
                                    <td style={{ padding: '1rem', color: '#555' }}>{bill.month}</td>
                                    <td style={{ padding: '1rem', fontWeight: '600', color: '#1a2b4b' }}>₹ {bill.amount}</td>
                                    <td style={{ padding: '1rem', color: '#555' }}>{bill.paidOn}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            background: '#E6FAFA',
                                            color: '#00D09C',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            width: 'fit-content'
                                        }}>
                                            <CheckCircle size={12} /> Paid
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button style={{ color: '#7B61FF', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <Download size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
