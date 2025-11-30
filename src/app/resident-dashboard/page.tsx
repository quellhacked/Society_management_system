"use client";
import { Home, Bell, CreditCard, MessageSquare, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';

export default function ResidentDashboard() {
    const { data: session } = useSession();
    const user = session?.user;
    const [stats, setStats] = useState({
        membersCount: 0,
        parkingSlot: 'Loading...',
        recentNotices: []
    });

    useEffect(() => {
        if (user?.flat) {
            fetch(`/api/resident-dashboard/stats?flat=${user.flat}`)
                .then(res => res.json())
                .then(data => setStats(data))
                .catch(err => console.error(err));
        }
    }, [user?.flat]);

    const getFloor = (flat: string | undefined) => {
        if (!flat) return '1st';
        const parts = flat.split('-');
        if (parts.length < 2) return '1st';

        const numPart = parts[1];
        const floorChar = numPart.charAt(0);
        const floor = parseInt(floorChar);

        if (isNaN(floor)) return '1st';

        if (floor === 1) return '1st';
        if (floor === 2) return '2nd';
        if (floor === 3) return '3rd';
        return `${floor}th`;
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>Welcome back, {user?.name?.split(' ')[0] || 'Resident'}!</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* My Flat Card */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '50px', height: '50px', background: '#e6f7ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0099ff' }}>
                                <Home size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a2b4b' }}>Flat {user?.flat || 'N/A'}</h3>
                                <p style={{ color: '#888' }}>Block {user?.flat?.split('-')[0] || 'A'}, {getFloor(user?.flat)} Floor</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f9f9f9', borderRadius: '12px' }}>
                            <span style={{ color: '#555' }}>Members</span>
                            <span style={{ fontWeight: '600', color: '#1a2b4b' }}>{stats.membersCount}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f9f9f9', borderRadius: '12px', marginTop: '0.5rem' }}>
                            <span style={{ color: '#555' }}>Parking</span>
                            <span style={{ fontWeight: '600', color: '#1a2b4b' }}>{stats.parkingSlot}</span>
                        </div>
                    </div>

                    {/* Maintenance Due Card */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #ffe5e5' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '50px', height: '50px', background: '#fff0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4d4f' }}>
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a2b4b' }}>Maintenance Due</h3>
                                <p style={{ color: '#ff4d4f', fontWeight: '600' }}>Due by 5th Dec</p>
                            </div>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1.5rem' }}>
                            ₹ 5,500
                        </div>
                        <button style={{ width: '100%', padding: '1rem', background: '#1a2b4b', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>
                            Pay Now
                        </button>
                    </div>

                    {/* Recent Notices */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', gridColumn: '1 / -1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a2b4b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Bell size={20} /> Recent Notices
                            </h3>
                            <button style={{ color: '#0099ff', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {stats.recentNotices.length > 0 ? (
                                stats.recentNotices.map((notice: any) => (
                                    <NoticeItem
                                        key={notice.id}
                                        title={notice.title}
                                        date={notice.date}
                                        desc={notice.content}
                                        type={notice.category === 'Urgent' ? 'important' : 'info'}
                                    />
                                ))
                            ) : (
                                <p style={{ color: '#888', fontStyle: 'italic' }}>No recent notices.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

function NoticeItem({ title, date, desc, type }: { title: string, date: string, desc: string, type: 'important' | 'info' }) {
    return (
        <div style={{
            padding: '1rem',
            borderLeft: `4px solid ${type === 'important' ? '#ff4d4f' : '#0099ff'}`,
            background: '#fcfcfc',
            borderRadius: '0 8px 8px 0'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontWeight: '600', color: '#1a2b4b' }}>{title}</h4>
                <span style={{ fontSize: '0.85rem', color: '#888' }}>{date}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>{desc}</p>
        </div>
    );
}
