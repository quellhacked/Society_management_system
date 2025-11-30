"use client";
import { useState } from 'react';
import { Calendar, Bell, Filter } from 'lucide-react';


const noticesData = [
    { id: 1, title: 'Annual General Meeting (AGM)', date: '2025-12-15', category: 'General', desc: 'The AGM will be held at the Community Hall at 10:00 AM. Agenda attached.' },
    { id: 2, title: 'Swimming Pool Maintenance', date: '2025-12-02', category: 'Maintenance', desc: 'Pool will be closed for cleaning on Tuesday.' },
    { id: 3, title: 'Diwali Celebration', date: '2025-11-01', category: 'Event', desc: 'Join us for the Diwali celebration at the main park.' },
    { id: 4, title: 'Water Tank Cleaning', date: '2025-10-20', category: 'Maintenance', desc: 'Water supply will be interrupted from 10 AM to 2 PM.' },
];

export default function ResidentNoticesPage() {
    const [filter, setFilter] = useState('All');

    const filteredNotices = filter === 'All'
        ? noticesData
        : noticesData.filter(n => n.category === filter);

    return (
        <div>

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Bell size={28} /> Notices & Announcements
                    </h1>

                    <div style={{ position: 'relative' }}>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{
                                padding: '0.8rem 2.5rem 0.8rem 1rem',
                                borderRadius: '12px',
                                border: 'none',
                                background: 'white',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                fontSize: '1rem',
                                color: '#555',
                                appearance: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="All">All Categories</option>
                            <option value="General">General</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Event">Events</option>
                        </select>
                        <Filter size={16} color="#888" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {filteredNotices.map((notice) => (
                        <div key={notice.id} style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '2rem',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                            borderLeft: `6px solid ${notice.category === 'Event' ? '#FF9F43' : notice.category === 'Maintenance' ? '#FF5B5B' : '#7B61FF'}`,
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: '#f8f9fa',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                color: '#666',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                <Calendar size={14} /> {notice.date}
                            </div>

                            <span style={{
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '20px',
                                background: notice.category === 'Event' ? '#FFF4E6' : notice.category === 'Maintenance' ? '#FFEAEA' : '#F4F2FF',
                                color: notice.category === 'Event' ? '#FF9F43' : notice.category === 'Maintenance' ? '#FF5B5B' : '#7B61FF',
                                marginBottom: '1rem',
                                display: 'inline-block'
                            }}>
                                {notice.category}
                            </span>

                            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '0.8rem' }}>{notice.title}</h3>
                            <p style={{ color: '#555', lineHeight: '1.6' }}>{notice.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
