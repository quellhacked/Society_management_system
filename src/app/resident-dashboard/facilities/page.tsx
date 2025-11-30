"use client";
import { useState, useEffect } from 'react';
import { Calendar, Clock, Check, X } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { useSession } from 'next-auth/react';

export default function FacilitiesPage() {
    const { data: session } = useSession();
    const [facilities, setFacilities] = useState<any[]>([]);
    const [selectedFacility, setSelectedFacility] = useState<any>(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        fetch('/api/facilities')
            .then(res => res.json())
            .then(data => {
                setFacilities(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const handleBook = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user) return;
        console.log('Booking Attempt:', { session, user: session?.user });

        if (!session?.user?.id) {
            alert('User ID not found. Please logout and login again to refresh your session.');
            return;
        }

        setBookingLoading(true);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    facilityId: selectedFacility.id,
                    facilityName: selectedFacility.name,
                    userId: session.user.id,
                    userName: session.user.name,
                    date: bookingDate,
                    timeSlot: bookingTime
                })
            });

            if (res.ok) {
                alert('Booking Request Sent! Waiting for Admin Approval.');
                setSelectedFacility(null);
                setBookingDate('');
                setBookingTime('');
            } else {
                alert('Booking failed');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Error booking facility');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading facilities...</div>;

    return (
        <div>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>Facility Booking</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {facilities.map(facility => (
                        <div key={facility.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <div style={{ height: '200px', background: '#eee', position: 'relative' }}>
                                <img src={facility.image} alt={facility.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                                    {facility.pricePerHour === 0 ? 'Free' : `₹${facility.pricePerHour}/hr`}
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '0.5rem' }}>{facility.name}</h3>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>{facility.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.9rem', color: '#888' }}>Capacity: {facility.capacity}</span>
                                    <button
                                        onClick={() => setSelectedFacility(facility)}
                                        style={{ background: '#1a2b4b', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            {selectedFacility && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '500px', position: 'relative' }}>
                        <button onClick={() => setSelectedFacility(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Book {selectedFacility.name}</h2>

                        <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select Date</label>
                                <input
                                    type="date"
                                    required
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select Time Slot</label>
                                <select
                                    required
                                    value={bookingTime}
                                    onChange={(e) => setBookingTime(e.target.value)}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                >
                                    <option value="">Select Time</option>
                                    <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                                    <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                                    <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                                    <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={bookingLoading}
                                style={{ background: '#00D09C', color: 'white', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: bookingLoading ? 'not-allowed' : 'pointer' }}
                            >
                                {bookingLoading ? 'Confirming...' : 'Confirm Booking'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
