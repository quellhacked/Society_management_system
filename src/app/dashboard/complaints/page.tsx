"use client";
import { useState } from 'react';
import { Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const initialComplaints = [
    { id: 'C-001', title: 'Leaking Tap in Kitchen', flat: 'A-101', category: 'Plumbing', priority: 'Medium', status: 'Open', date: '2025-11-29' },
    { id: 'C-002', title: 'Street Light Flickering', flat: 'Common Area', category: 'Electrical', priority: 'Low', status: 'In Progress', date: '2025-11-28' },
    { id: 'C-003', title: 'Lift Not Working', flat: 'Block B', category: 'Electrical', priority: 'High', status: 'Open', date: '2025-11-30' },
    { id: 'C-004', title: 'Garbage Not Collected', flat: 'C-301', category: 'Housekeeping', priority: 'Medium', status: 'Resolved', date: '2025-11-25' },
];

export default function AdminComplaintsPage() {
    const [complaints, setComplaints] = useState(initialComplaints);
    const [filter, setFilter] = useState('All');

    const handleStatusChange = (id: string, newStatus: string) => {
        setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    const filteredComplaints = filter === 'All'
        ? complaints
        : complaints.filter(c => c.status === filter);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b' }}>Complaint Management</h1>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setFilter('All')}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '20px', border: 'none', background: filter === 'All' ? '#1a2b4b' : 'white', color: filter === 'All' ? 'white' : '#555', cursor: 'pointer', fontWeight: '600' }}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('Open')}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '20px', border: 'none', background: filter === 'Open' ? '#FF5B5B' : 'white', color: filter === 'Open' ? 'white' : '#555', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Open
                    </button>
                    <button
                        onClick={() => setFilter('In Progress')}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '20px', border: 'none', background: filter === 'In Progress' ? '#FF9F43' : 'white', color: filter === 'In Progress' ? 'white' : '#555', cursor: 'pointer', fontWeight: '600' }}
                    >
                        In Progress
                    </button>
                    <button
                        onClick={() => setFilter('Resolved')}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '20px', border: 'none', background: filter === 'Resolved' ? '#00D09C' : 'white', color: filter === 'Resolved' ? 'white' : '#555', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Resolved
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {filteredComplaints.map((complaint) => (
                    <div key={complaint.id} style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                        borderLeft: `5px solid ${complaint.priority === 'High' ? '#FF5B5B' : complaint.priority === 'Medium' ? '#FF9F43' : '#00D09C'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: '700', color: '#1a2b4b' }}>{complaint.id}</span>
                                <span style={{ fontSize: '0.9rem', color: '#888' }}>• {complaint.date}</span>
                                <span style={{
                                    fontSize: '0.8rem',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '12px',
                                    background: '#f0f0f0',
                                    color: '#666',
                                    fontWeight: '600'
                                }}>
                                    {complaint.category}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '0.3rem' }}>{complaint.title}</h3>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>Raised by: <span style={{ fontWeight: '600' }}>{complaint.flat}</span></p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Priority</p>
                                <span style={{
                                    fontWeight: '600',
                                    color: complaint.priority === 'High' ? '#FF5B5B' : complaint.priority === 'Medium' ? '#FF9F43' : '#00D09C'
                                }}>
                                    {complaint.priority}
                                </span>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Status</p>
                                <select
                                    value={complaint.status}
                                    onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                                    style={{
                                        padding: '0.4rem',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        fontWeight: '600',
                                        color: '#555',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
