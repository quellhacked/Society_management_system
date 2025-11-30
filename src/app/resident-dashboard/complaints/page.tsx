"use client";
import { useState } from 'react';
import { Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';


const myComplaints = [
    { id: 'C-001', title: 'Leaking Tap in Kitchen', category: 'Plumbing', priority: 'Medium', status: 'Open', date: '2025-11-29' },
    { id: 'C-004', title: 'Garbage Not Collected', category: 'Housekeeping', priority: 'Medium', status: 'Resolved', date: '2025-11-25' },
];

export default function ResidentComplaintsPage() {
    const [complaints, setComplaints] = useState(myComplaints);
    const [showForm, setShowForm] = useState(false);
    const [newComplaint, setNewComplaint] = useState({ title: '', category: 'Plumbing', priority: 'Medium', desc: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const complaint = {
            id: `C-00${complaints.length + 5}`,
            ...newComplaint,
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        };
        setComplaints([complaint, ...complaints]);
        setShowForm(false);
        setNewComplaint({ title: '', category: 'Plumbing', priority: 'Medium', desc: '' });
    };

    return (
        <div>

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertCircle size={28} /> My Complaints
                    </h1>

                    <button
                        onClick={() => setShowForm(true)}
                        style={{
                            background: '#FF5B5B',
                            color: 'white',
                            padding: '0.8rem 1.5rem',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(255, 91, 91, 0.3)'
                        }}
                    >
                        <Plus size={18} /> Raise Complaint
                    </button>
                </div>

                {/* Raise Complaint Form */}
                {showForm && (
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        marginBottom: '2rem',
                        border: '1px solid #eee'
                    }}>
                        <h3 style={{ marginBottom: '1.5rem', color: '#1a2b4b' }}>New Complaint</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Issue Title (e.g., Leaking Tap)"
                                required
                                value={newComplaint.title}
                                onChange={e => setNewComplaint({ ...newComplaint, title: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <select
                                    value={newComplaint.category}
                                    onChange={e => setNewComplaint({ ...newComplaint, category: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                                >
                                    <option value="Plumbing">Plumbing</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Housekeeping">Housekeeping</option>
                                    <option value="Security">Security</option>
                                    <option value="Other">Other</option>
                                </select>
                                <select
                                    value={newComplaint.priority}
                                    onChange={e => setNewComplaint({ ...newComplaint, priority: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                                >
                                    <option value="Low">Low Priority</option>
                                    <option value="Medium">Medium Priority</option>
                                    <option value="High">High Priority</option>
                                </select>
                            </div>
                            <textarea
                                placeholder="Describe the issue in detail..."
                                rows={3}
                                required
                                value={newComplaint.desc}
                                onChange={e => setNewComplaint({ ...newComplaint, desc: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                            />
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" style={{ padding: '0.8rem 2rem', background: '#1a2b4b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Submit</button>
                                <button type="button" onClick={() => setShowForm(false)} style={{ padding: '0.8rem 2rem', background: '#f0f0f0', color: '#666', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Complaints List */}
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {complaints.map((complaint) => (
                        <div key={complaint.id} style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                            borderLeft: `5px solid ${complaint.status === 'Open' ? '#FF5B5B' : complaint.status === 'In Progress' ? '#FF9F43' : '#00D09C'}`,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
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
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>{complaint.title}</h3>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: complaint.status === 'Open' ? '#FF5B5B' : complaint.status === 'In Progress' ? '#FF9F43' : '#00D09C',
                                    fontWeight: '700',
                                    fontSize: '1rem'
                                }}>
                                    {complaint.status === 'Open' && <AlertCircle size={18} />}
                                    {complaint.status === 'In Progress' && <Clock size={18} />}
                                    {complaint.status === 'Resolved' && <CheckCircle size={18} />}
                                    {complaint.status}
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '4px' }}>Priority: {complaint.priority}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
