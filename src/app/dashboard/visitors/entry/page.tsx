"use client";
import { useState } from 'react';
import { UserPlus, Clock, CheckCircle, LogOut, Search, Shield } from 'lucide-react';

interface Visitor {
    id: string;
    name: string;
    phone: string;
    flat: string;
    purpose: string;
    checkIn: string;
    checkOut?: string;
    status: 'Active' | 'Checked Out';
}

export default function GuardEntryPage() {
    const [visitors, setVisitors] = useState<Visitor[]>([
        { id: 'VIS-001', name: 'Ramesh Kumar', phone: '9876543210', flat: 'A-101', purpose: 'Delivery', checkIn: '10:30 AM', status: 'Active' },
        { id: 'VIS-002', name: 'Suresh Singh', phone: '9123456780', flat: 'B-202', purpose: 'Guest', checkIn: '11:15 AM', status: 'Active' }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        flat: '',
        purpose: 'Guest'
    });

    const handleCheckIn = (e: React.FormEvent) => {
        e.preventDefault();
        const newVisitor: Visitor = {
            id: `VIS-${Math.floor(Math.random() * 1000)}`,
            ...formData,
            checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Active'
        };
        setVisitors([newVisitor, ...visitors]);
        setFormData({ name: '', phone: '', flat: '', purpose: 'Guest' });
    };

    const handleCheckOut = (id: string) => {
        setVisitors(visitors.map(v =>
            v.id === id ? { ...v, status: 'Checked Out', checkOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : v
        ));
    };

    const activeVisitors = visitors.filter(v => v.status === 'Active');

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Shield size={32} color="#7B61FF" /> Guard Station
                    </h1>
                    <p style={{ color: '#666' }}>Manage visitor entry and exit</p>
                </div>
                <div style={{ background: 'white', padding: '0.8rem 1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', gap: '2rem' }}>
                    <div>
                        <p style={{ fontSize: '0.8rem', color: '#888' }}>Active Visitors</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a2b4b' }}>{activeVisitors.length}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.8rem', color: '#888' }}>Total Today</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a2b4b' }}>{visitors.length}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Entry Form */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 'fit-content' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <UserPlus size={20} /> New Entry
                    </h2>
                    <form onSubmit={handleCheckIn} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Visitor Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #eee', outline: 'none', background: '#fcfcfc' }}
                                placeholder="Enter name"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #eee', outline: 'none', background: '#fcfcfc' }}
                                placeholder="Enter phone"
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Flat No.</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.flat}
                                    onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #eee', outline: 'none', background: '#fcfcfc' }}
                                    placeholder="e.g. A-101"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Purpose</label>
                                <select
                                    value={formData.purpose}
                                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #eee', outline: 'none', background: '#fcfcfc' }}
                                >
                                    <option value="Guest">Guest</option>
                                    <option value="Delivery">Delivery</option>
                                    <option value="Service">Service</option>
                                    <option value="Cab">Cab</option>
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: '#1a2b4b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(26, 43, 75, 0.2)'
                            }}
                        >
                            Check In Visitor
                        </button>
                    </form>
                </div>

                {/* Active Visitors List */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a2b4b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Clock size={20} /> Active Visitors
                        </h2>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} color="#999" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Search visitors..."
                                style={{ padding: '0.6rem 0.6rem 0.6rem 2.2rem', borderRadius: '20px', border: '1px solid #eee', outline: 'none', fontSize: '0.9rem' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {activeVisitors.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                                <CheckCircle size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                                <p>No active visitors currently.</p>
                            </div>
                        ) : (
                            activeVisitors.map((visitor) => (
                                <div key={visitor.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    border: '1px solid #f5f5f5',
                                    borderRadius: '16px',
                                    transition: 'all 0.2s'
                                }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            background: '#F4F1FF',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#7B61FF',
                                            fontWeight: '700',
                                            fontSize: '1.2rem'
                                        }}>
                                            {visitor.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a2b4b' }}>{visitor.name}</h3>
                                            <p style={{ fontSize: '0.85rem', color: '#666' }}>Visiting: <span style={{ fontWeight: '600', color: '#1a2b4b' }}>{visitor.flat}</span> • {visitor.purpose}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>In: {visitor.checkIn}</p>
                                        <button
                                            onClick={() => handleCheckOut(visitor.id)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#ffe5e5',
                                                color: '#ff4d4f',
                                                border: 'none',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            Check Out <LogOut size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
