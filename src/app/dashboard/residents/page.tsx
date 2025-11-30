"use client";
import { useState, useEffect } from 'react';
import { Search, Phone, Mail, User, Shield, Edit2, X, Check, Trash2 } from 'lucide-react';

const ROLES = ['Resident', 'Admin', 'Secretary', 'Accountant', 'Staff'];

export default function ResidentsPage() {
    const [residents, setResidents] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', flat: '', phone: '', role: 'resident' });
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetchResidents();
    }, []);

    const fetchResidents = async () => {
        try {
            const res = await fetch('/api/users');
            if (res.ok) {
                const data = await res.json();
                // Filter only residents
                const residentsOnly = data.filter((u: any) => u.role === 'resident' || u.role === 'admin' || u.role === 'co-admin');
                setResidents(residentsOnly);
            }
        } catch (error) {
            console.error('Error fetching residents:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredResidents = residents.filter(resident =>
        (resident.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (resident.flat?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (resident: any) => {
        setEditingId(resident.id);
        // Map backend role to frontend display role
        let displayRole = resident.role.charAt(0).toUpperCase() + resident.role.slice(1);
        if (resident.role === 'co-admin') displayRole = 'Secretary';
        setSelectedRole(displayRole);
    };

    const handleSaveRole = async (id: number) => {
        try {
            const res = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, role: selectedRole })
            });

            if (res.ok) {
                // Optimistic update or refetch
                fetchResidents();
                setEditingId(null);
            } else {
                alert('Failed to update role');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            alert('Error updating role');
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const res = await fetch(`/api/users?id=${id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    setResidents(residents.filter(r => r.id !== id));
                } else {
                    alert('Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Error deleting user');
            }
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setAdding(true);
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            if (res.ok) {
                const addedUser = await res.json();
                setResidents([...residents, addedUser]);
                setShowAddModal(false);
                setNewUser({ name: '', email: '', flat: '', phone: '', role: 'resident' });
            } else {
                alert('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error adding user');
        } finally {
            setAdding(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading directory...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b' }}>Resident Directory</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    style={{
                        background: '#1a2b4b', color: 'white', border: 'none', padding: '0.8rem 1.5rem',
                        borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    + Add Resident
                </button>
            </div>

            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', width: '400px' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#1a2b4b' }}>Add New Resident</h2>
                        <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text" placeholder="Full Name" required
                                value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="email" placeholder="Email Address" required
                                value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="text" placeholder="Flat Number (e.g. A-101)" required
                                value={newUser.flat} onChange={e => setNewUser({ ...newUser, flat: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="tel" placeholder="Phone Number"
                                value={newUser.phone} onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <select
                                value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            >
                                <option value="resident">Resident</option>
                                <option value="admin">Admin</option>
                                <option value="co-admin">Co-Admin</option>
                            </select>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                <button type="submit" disabled={adding} style={{ flex: 1, background: '#00D09C', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                                    {adding ? 'Creating...' : 'Create User'}
                                </button>
                                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#f0f0f0', color: '#666', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'white',
                padding: '1rem',
                borderRadius: '16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                marginBottom: '2rem'
            }}>
                <Search size={20} color="#999" />
                <input
                    type="text"
                    placeholder="Search by name or flat number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem' }}
                />
            </div>

            {/* Residents List */}
            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Flat</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Type</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Assigned Role</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Contact</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResidents.map((resident) => (
                            <tr key={resident.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e6f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0099ff' }}>
                                            <User size={20} />
                                        </div>
                                        <span style={{ fontWeight: '600', color: '#1a2b4b' }}>{resident.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', color: '#555' }}>{resident.flat}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        background: resident.type === 'Owner' ? '#E6FAFA' : '#FFF4E6',
                                        color: resident.type === 'Owner' ? '#00D09C' : '#FF9F43'
                                    }}>
                                        {resident.type}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {editingId === resident.id ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <select
                                                value={selectedRole}
                                                onChange={(e) => setSelectedRole(e.target.value)}
                                                style={{ padding: '0.4rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.9rem' }}
                                            >
                                                {ROLES.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                            <button onClick={() => handleSaveRole(resident.id)} style={{ background: '#00D09C', border: 'none', borderRadius: '4px', padding: '4px', color: 'white', cursor: 'pointer' }}><Check size={16} /></button>
                                            <button onClick={() => setEditingId(null)} style={{ background: '#FF5B5B', border: 'none', borderRadius: '4px', padding: '4px', color: 'white', cursor: 'pointer' }}><X size={16} /></button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                background: resident.role === 'resident' ? '#f0f0f0' : '#F4F1FF',
                                                color: resident.role === 'resident' ? '#666' : '#7B61FF',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                textTransform: 'capitalize'
                                            }}>
                                                {resident.role !== 'resident' && <Shield size={12} />}
                                                {resident.role === 'co-admin' ? 'Secretary' : resident.role}
                                            </span>
                                            <button
                                                onClick={() => handleEditClick(resident)}
                                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#999', padding: '4px' }}
                                                title="Assign Role"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.9rem', color: '#666' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> {resident.phone}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> {resident.email}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <button style={{ color: '#7B61FF', fontWeight: '600', border: 'none', background: 'none', cursor: 'pointer' }}>View</button>
                                        <button
                                            onClick={() => handleDelete(resident.id)}
                                            style={{ color: '#FF5B5B', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                            title="Delete User"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
