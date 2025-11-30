"use client";
import { useState } from 'react';
import { Search, Plus, Calendar, Bell, Trash2 } from 'lucide-react';

// Mock Data
const initialNotices = [
    { id: 1, title: 'Annual General Meeting (AGM)', date: '2025-12-15', category: 'General', desc: 'The AGM will be held at the Community Hall at 10:00 AM. Agenda attached.' },
    { id: 2, title: 'Swimming Pool Maintenance', date: '2025-12-02', category: 'Maintenance', desc: 'Pool will be closed for cleaning on Tuesday.' },
    { id: 3, title: 'Diwali Celebration', date: '2025-11-01', category: 'Event', desc: 'Join us for the Diwali celebration at the main park.' },
];

export default function AdminNoticesPage() {
    const [notices, setNotices] = useState(initialNotices);
    const [showForm, setShowForm] = useState(false);
    const [newNotice, setNewNotice] = useState({ title: '', date: '', category: 'General', desc: '' });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const notice = {
            id: notices.length + 1,
            ...newNotice
        };
        setNotices([notice, ...notices]);
        setShowForm(false);
        setNewNotice({ title: '', date: '', category: 'General', desc: '' });
    };

    const handleDelete = (id: number) => {
        setNotices(notices.filter(n => n.id !== id));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b' }}>Notice Board</h1>
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
                    <Plus size={18} /> Create Notice
                </button>
            </div>

            {/* Create Notice Form Modal (Simplified as inline for MVP) */}
            {showForm && (
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    marginBottom: '2rem',
                    border: '1px solid #eee'
                }}>
                    <h3 style={{ marginBottom: '1.5rem', color: '#1a2b4b' }}>New Notice</h3>
                    <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Notice Title"
                            required
                            value={newNotice.title}
                            onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input
                                type="date"
                                required
                                value={newNotice.date}
                                onChange={e => setNewNotice({ ...newNotice, date: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                            />
                            <select
                                value={newNotice.category}
                                onChange={e => setNewNotice({ ...newNotice, category: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                            >
                                <option value="General">General</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Event">Event</option>
                            </select>
                        </div>
                        <textarea
                            placeholder="Description"
                            rows={3}
                            required
                            value={newNotice.desc}
                            onChange={e => setNewNotice({ ...newNotice, desc: e.target.value })}
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                        />
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" style={{ padding: '0.8rem 2rem', background: '#00D09C', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Publish</button>
                            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '0.8rem 2rem', background: '#f0f0f0', color: '#666', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Notices List */}
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {notices.map((notice) => (
                    <div key={notice.id} style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                        borderLeft: `5px solid ${notice.category === 'Event' ? '#FF9F43' : notice.category === 'Maintenance' ? '#FF5B5B' : '#7B61FF'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '12px',
                                    background: '#f0f0f0',
                                    color: '#666'
                                }}>
                                    {notice.category}
                                </span>
                                <span style={{ fontSize: '0.9rem', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Calendar size={14} /> {notice.date}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '0.5rem' }}>{notice.title}</h3>
                            <p style={{ color: '#666', lineHeight: '1.5' }}>{notice.desc}</p>
                        </div>

                        <button
                            onClick={() => handleDelete(notice.id)}
                            style={{
                                background: '#fff0f0',
                                color: '#ff4d4f',
                                border: 'none',
                                padding: '0.6rem',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
