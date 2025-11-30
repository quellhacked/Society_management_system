"use client";
import { useState } from 'react';
import { Plus, Search, Download, CheckCircle, Clock } from 'lucide-react';

const initialBills = [
    { id: 'INV-2025-001', flat: 'A-101', amount: 5500, month: 'November 2025', status: 'Pending', dueDate: '2025-12-05' },
    { id: 'INV-2025-002', flat: 'A-102', amount: 5500, month: 'November 2025', status: 'Paid', dueDate: '2025-12-05' },
    { id: 'INV-2025-003', flat: 'B-201', amount: 4500, month: 'November 2025', status: 'Paid', dueDate: '2025-12-05' },
    { id: 'INV-2025-004', flat: 'B-202', amount: 4500, month: 'November 2025', status: 'Pending', dueDate: '2025-12-05' },
];

export default function AdminMaintenancePage() {
    const [bills, setBills] = useState(initialBills);
    const [showForm, setShowForm] = useState(false);
    const [newBill, setNewBill] = useState({ flat: '', amount: '', month: '', dueDate: '' });

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        const bill = {
            id: `INV-2025-00${bills.length + 1}`,
            flat: newBill.flat,
            amount: Number(newBill.amount),
            month: newBill.month,
            status: 'Pending',
            dueDate: newBill.dueDate
        };
        setBills([bill, ...bills]);
        setShowForm(false);
        setNewBill({ flat: '', amount: '', month: '', dueDate: '' });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b' }}>Maintenance Billing</h1>
                <button
                    onClick={() => setShowForm(true)}
                    style={{
                        background: '#7B61FF',
                        color: 'white',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <Plus size={18} /> Generate Bill
                </button>
            </div>

            {/* Generate Bill Form */}
            {showForm && (
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    marginBottom: '2rem',
                    border: '1px solid #eee'
                }}>
                    <h3 style={{ marginBottom: '1.5rem', color: '#1a2b4b' }}>Generate New Bill</h3>
                    <form onSubmit={handleGenerate} style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Flat Number (e.g., A-101)"
                                required
                                value={newBill.flat}
                                onChange={e => setNewBill({ ...newBill, flat: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                            />
                            <input
                                type="number"
                                placeholder="Amount (₹)"
                                required
                                value={newBill.amount}
                                onChange={e => setNewBill({ ...newBill, amount: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Month (e.g., December 2025)"
                                required
                                value={newBill.month}
                                onChange={e => setNewBill({ ...newBill, month: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                            />
                            <input
                                type="date"
                                placeholder="Due Date"
                                required
                                value={newBill.dueDate}
                                onChange={e => setNewBill({ ...newBill, dueDate: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" style={{ padding: '0.8rem 2rem', background: '#00D09C', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Generate</button>
                            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '0.8rem 2rem', background: '#f0f0f0', color: '#666', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bills List */}
            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Invoice ID</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Flat</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Month</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Amount</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Due Date</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => (
                            <tr key={bill.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '1rem', fontWeight: '600', color: '#1a2b4b' }}>{bill.id}</td>
                                <td style={{ padding: '1rem', color: '#555' }}>{bill.flat}</td>
                                <td style={{ padding: '1rem', color: '#555' }}>{bill.month}</td>
                                <td style={{ padding: '1rem', fontWeight: '600', color: '#1a2b4b' }}>₹ {bill.amount}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        background: bill.status === 'Paid' ? '#E6FAFA' : '#FFF4E6',
                                        color: bill.status === 'Paid' ? '#00D09C' : '#FF9F43',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        width: 'fit-content'
                                    }}>
                                        {bill.status === 'Paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                        {bill.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', color: '#888', fontSize: '0.9rem' }}>{bill.dueDate}</td>
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
        </div>
    );
}
