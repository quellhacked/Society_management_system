"use client";
import { useState, useEffect } from 'react';
import { Calendar, Clock, Check, X, User } from 'lucide-react';

export default function AdminFacilitiesPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/bookings')
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const res = await fetch('/api/bookings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });

            if (res.ok) {
                setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating status');
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading bookings...</div>;

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>Facility Bookings</h1>

            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Facility</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Resident</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Date & Time</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No bookings found.</td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600', color: '#1a2b4b' }}>{booking.facilityName}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <User size={16} color="#888" />
                                            <span>{booking.userName}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.9rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {booking.date}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {booking.timeSlot}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {booking.status === 'Pending' ? (
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={() => handleStatusUpdate(booking.id, 'Confirmed')}
                                                    style={{
                                                        background: '#E6FAFA', color: '#00D09C', border: 'none',
                                                        width: '32px', height: '32px', borderRadius: '50%',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        cursor: 'pointer'
                                                    }}
                                                    title="Approve"
                                                >
                                                    <Check size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(booking.id, 'Rejected')}
                                                    style={{
                                                        background: '#FFE5E5', color: '#FF5B5B', border: 'none',
                                                        width: '32px', height: '32px', borderRadius: '50%',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        cursor: 'pointer'
                                                    }}
                                                    title="Reject"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span style={{
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                background: booking.status === 'Confirmed' ? '#E6FAFA' : '#FFE5E5',
                                                color: booking.status === 'Confirmed' ? '#00D09C' : '#FF5B5B'
                                            }}>
                                                {booking.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
