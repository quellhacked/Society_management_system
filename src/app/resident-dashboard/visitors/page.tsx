"use client";
import { useState } from 'react';
import { History, UserCheck, UserX, Clock, Calendar } from 'lucide-react';


const initialHistory = [
    { id: 'VIS-001', name: 'Ramesh Kumar', purpose: 'Delivery', date: '2025-11-30', time: '10:30 AM', status: 'Allowed' },
    { id: 'VIS-002', name: 'Unknown Person', purpose: 'Sales', date: '2025-11-29', time: '04:15 PM', status: 'Denied' },
    { id: 'VIS-003', name: 'Suresh Singh', purpose: 'Guest', date: '2025-11-28', time: '07:00 PM', status: 'Allowed' },
];

export default function ResidentVisitorsPage() {
    const [history] = useState(initialHistory);

    return (
        <div>

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <History size={28} /> Visitor History
                </h1>

                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8f9fa' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Visitor Name</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Purpose</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Date & Time</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((visit) => (
                                <tr key={visit.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600', color: '#1a2b4b' }}>{visit.name}</td>
                                    <td style={{ padding: '1rem', color: '#555' }}>{visit.purpose}</td>
                                    <td style={{ padding: '1rem', color: '#555' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}><Calendar size={14} /> {visit.date}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: '#888' }}><Clock size={14} /> {visit.time}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            background: visit.status === 'Allowed' ? '#E6FAFA' : '#FFE5E5',
                                            color: visit.status === 'Allowed' ? '#00D09C' : '#FF5B5B',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            width: 'fit-content'
                                        }}>
                                            {visit.status === 'Allowed' ? <UserCheck size={14} /> : <UserX size={14} />}
                                            {visit.status}
                                        </span>
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
