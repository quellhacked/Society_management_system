"use client";
import { useState } from 'react';
import { History, UserCheck, UserX, Clock, Calendar, Search, Filter } from 'lucide-react';

const initialHistory = [
    { id: 'VIS-001', name: 'Ramesh Kumar', flat: 'A-101', purpose: 'Delivery', date: '2025-11-30', time: '10:30 AM', status: 'Active', enteredBy: 'Gate 1' },
    { id: 'VIS-002', name: 'Unknown Person', flat: 'B-202', purpose: 'Sales', date: '2025-11-29', time: '04:15 PM', status: 'Denied', enteredBy: 'Gate 1' },
    { id: 'VIS-003', name: 'Suresh Singh', flat: 'C-303', purpose: 'Guest', date: '2025-11-28', time: '07:00 PM', status: 'Checked Out', enteredBy: 'Gate 2' },
];

export default function AdminVisitorsPage() {
    const [history] = useState(initialHistory);

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <History size={28} /> Visitor Logs
                    </h1>
                    <p style={{ color: '#666' }}>View and manage all society visitor records</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1rem', border: '1px solid #eee', borderRadius: '12px', background: 'white', color: '#555', cursor: 'pointer' }}>
                        <Filter size={16} /> Filter
                    </button>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} color="#999" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            style={{ padding: '0.6rem 0.6rem 0.6rem 2.2rem', borderRadius: '12px', border: '1px solid #eee', outline: 'none', fontSize: '0.9rem', width: '250px' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Visitor Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Flat</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Purpose</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Date & Time</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Entry Gate</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((visit) => (
                            <tr key={visit.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '1rem', fontWeight: '600', color: '#1a2b4b' }}>{visit.name}</td>
                                <td style={{ padding: '1rem', color: '#555' }}>{visit.flat}</td>
                                <td style={{ padding: '1rem', color: '#555' }}>{visit.purpose}</td>
                                <td style={{ padding: '1rem', color: '#555' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}><Calendar size={14} /> {visit.date}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: '#888' }}><Clock size={14} /> {visit.time}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', color: '#555' }}>{visit.enteredBy}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        background: visit.status === 'Active' ? '#E6FAFA' : visit.status === 'Denied' ? '#FFE5E5' : '#f0f0f0',
                                        color: visit.status === 'Active' ? '#00D09C' : visit.status === 'Denied' ? '#FF5B5B' : '#666',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        width: 'fit-content'
                                    }}>
                                        {visit.status === 'Active' ? <UserCheck size={14} /> : visit.status === 'Denied' ? <UserX size={14} /> : <History size={14} />}
                                        {visit.status}
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
