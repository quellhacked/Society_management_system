"use client";
import { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, CheckCircle, XCircle } from 'lucide-react';

const initialTransactions = [
    { id: 'TXN-837291', user: 'Nitesh Sharma (A-101)', amount: 5500, type: 'Maintenance', date: '2025-11-29', status: 'Success' },
    { id: 'TXN-928374', user: 'Rahul Verma (B-202)', amount: 4500, type: 'Maintenance', date: '2025-11-28', status: 'Success' },
    { id: 'TXN-192837', user: 'Priya Singh (C-303)', amount: 5500, type: 'Maintenance', date: '2025-11-28', status: 'Failed' },
    { id: 'TXN-736281', user: 'Amit Kumar (A-102)', amount: 500, type: 'Facility Booking', date: '2025-11-27', status: 'Success' },
];

export default function AdminTransactionsPage() {
    const [transactions, setTransactions] = useState(initialTransactions);
    const [filter, setFilter] = useState('All');

    const filteredTransactions = filter === 'All'
        ? transactions
        : transactions.filter(t => t.status === filter);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b' }}>Transactions</h1>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setFilter('All')}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '20px', border: 'none', background: filter === 'All' ? '#1a2b4b' : 'white', color: filter === 'All' ? 'white' : '#555', cursor: 'pointer', fontWeight: '600' }}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('Success')}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '20px', border: 'none', background: filter === 'Success' ? '#00D09C' : 'white', color: filter === 'Success' ? 'white' : '#555', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Success
                    </button>
                    <button
                        onClick={() => setFilter('Failed')}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '20px', border: 'none', background: filter === 'Failed' ? '#FF5B5B' : 'white', color: filter === 'Failed' ? 'white' : '#555', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Failed
                    </button>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Transaction ID</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>User</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Type</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Date</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Amount</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((txn) => (
                            <tr key={txn.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '1rem', fontWeight: '600', color: '#1a2b4b' }}>{txn.id}</td>
                                <td style={{ padding: '1rem', color: '#555' }}>{txn.user}</td>
                                <td style={{ padding: '1rem', color: '#555' }}>{txn.type}</td>
                                <td style={{ padding: '1rem', color: '#888', fontSize: '0.9rem' }}>{txn.date}</td>
                                <td style={{ padding: '1rem', fontWeight: '700', color: '#1a2b4b' }}>₹ {txn.amount}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        background: txn.status === 'Success' ? '#E6FAFA' : '#FFE5E5',
                                        color: txn.status === 'Success' ? '#00D09C' : '#FF5B5B',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        width: 'fit-content'
                                    }}>
                                        {txn.status === 'Success' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                        {txn.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
