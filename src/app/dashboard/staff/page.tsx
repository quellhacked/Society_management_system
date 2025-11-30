"use client";
import { useState, useEffect } from 'react';
import { Search, Phone, Mail, User, Shield, Trash2 } from 'lucide-react';

export default function StaffPage() {
    const [staff, setStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const res = await fetch('/api/users');
            if (res.ok) {
                const data = await res.json();
                // Filter for staff roles
                // We can include 'staff', 'admin', 'co-admin', 'accountant' or just 'staff'
                // Based on the request "Staff option", usually means employees.
                // Let's show anyone who is NOT a resident for now, or specifically 'staff' role.
                // Given the context, "Staff" usually refers to employees like Watchman, Cleaner.
                // But the user might expect to see all committee members too?
                // Let's stick to 'staff' role for now as per the "Staff" label.
                // Actually, let's include all non-residents to be safe, or maybe just 'staff' and 'accountant'?
                // Let's filter for role === 'staff' primarily, as Committee usually goes under "Residents" with special roles.
                // But wait, the user might want to see the Watchman here.
                const staffMembers = data.filter((user: any) => user.role === 'staff');
                setStaff(staffMembers);
            }
        } catch (error) {
            console.error('Failed to fetch staff:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredStaff = staff.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.flat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div style={{ padding: '2rem' }}>Loading staff...</div>;

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>Staff Directory</h1>

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
                    placeholder="Search staff..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem' }}
                />
            </div>

            {/* Staff List */}
            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Location/Post</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Role</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Contact</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No staff members found.</td>
                            </tr>
                        ) : (
                            filteredStaff.map((member) => (
                                <tr key={member.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFF4E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF9F43' }}>
                                                <User size={20} />
                                            </div>
                                            <span style={{ fontWeight: '600', color: '#1a2b4b' }}>{member.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', color: '#555' }}>{member.flat}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            background: '#F4F1FF',
                                            color: '#7B61FF',
                                            textTransform: 'capitalize'
                                        }}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.9rem', color: '#666' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> {member.phone}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> {member.email}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ color: '#00D09C', fontWeight: '600', fontSize: '0.9rem' }}>Active</span>
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
