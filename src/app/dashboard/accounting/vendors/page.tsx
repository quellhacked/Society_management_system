"use client";
import { useState, useEffect } from 'react';
import { User, Phone, Mail, Plus } from 'lucide-react';

export default function VendorsPage() {
    const [vendors, setVendors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newVendor, setNewVendor] = useState({ name: '', serviceType: '', contact: '', email: '' });

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const res = await fetch('/api/vendors');
            if (res.ok) {
                setVendors(await res.json());
            }
        } catch (error) {
            console.error('Error fetching vendors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddVendor = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/vendors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVendor)
            });

            if (res.ok) {
                fetchVendors();
                setShowAddModal(false);
                setNewVendor({ name: '', serviceType: '', contact: '', email: '' });
            }
        } catch (error) {
            console.error('Error adding vendor:', error);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading vendors...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b' }}>Vendor Management</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    style={{
                        background: '#1a2b4b', color: 'white', border: 'none', padding: '0.8rem 1.5rem',
                        borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <Plus size={18} /> Add Vendor
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {vendors.map(vendor => (
                    <div key={vendor.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F4F1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B61FF' }}>
                                <User size={20} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a2b4b' }}>{vendor.name}</h3>
                                <span style={{ fontSize: '0.9rem', color: '#888' }}>{vendor.serviceType}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#666', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> {vendor.contact}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> {vendor.email}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Vendor Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', width: '400px' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#1a2b4b' }}>Add New Vendor</h2>
                        <form onSubmit={handleAddVendor} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text" placeholder="Vendor Name" required
                                value={newVendor.name} onChange={e => setNewVendor({ ...newVendor, name: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="text" placeholder="Service Type (e.g. Plumbing)" required
                                value={newVendor.serviceType} onChange={e => setNewVendor({ ...newVendor, serviceType: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="tel" placeholder="Contact Number" required
                                value={newVendor.contact} onChange={e => setNewVendor({ ...newVendor, contact: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="email" placeholder="Email Address"
                                value={newVendor.email} onChange={e => setNewVendor({ ...newVendor, email: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />

                            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                <button type="submit" style={{ flex: 1, background: '#1a2b4b', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Save</button>
                                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#f0f0f0', color: '#666', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
