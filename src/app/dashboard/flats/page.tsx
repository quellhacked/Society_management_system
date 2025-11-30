"use client";
import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';

// Mock Data
const flatsData = [
    { id: 'A-101', block: 'A', floor: 1, type: '3BHK', status: 'Occupied', owner: 'Rajesh Kumar' },
    { id: 'A-102', block: 'A', floor: 1, type: '3BHK', status: 'Vacant', owner: 'N/A' },
    { id: 'B-201', block: 'B', floor: 2, type: '2BHK', status: 'Rented', owner: 'Suresh Raina' },
    { id: 'B-202', block: 'B', floor: 2, type: '2BHK', status: 'Occupied', owner: 'Amitabh B' },
    { id: 'C-301', block: 'C', floor: 3, type: '4BHK', status: 'Occupied', owner: 'Shahrukh K' },
];

export default function FlatsPage() {
    const [filter, setFilter] = useState('All');

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b' }}>Flats Management</h1>
                <button style={{
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
                }}>
                    <Plus size={18} /> Add Flat
                </button>
            </div>

            {/* Filters & Search */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'white',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    flex: 1,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                }}>
                    <Search size={20} color="#999" />
                    <input
                        type="text"
                        placeholder="Search flat number or owner..."
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem' }}
                    />
                </div>

                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'white',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#555',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                }}>
                    <Filter size={18} /> Filter
                </button>
            </div>

            {/* Flats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {flatsData.map((flat) => (
                    <div key={flat.id} style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                        border: '1px solid #f0f0f0',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '6px',
                            height: '100%',
                            background: flat.status === 'Occupied' ? '#00D09C' : flat.status === 'Vacant' ? '#FF5B5B' : '#FF9F43'
                        }}></div>

                        <div style={{ marginLeft: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1a2b4b' }}>{flat.id}</h3>
                                    <p style={{ color: '#888', fontSize: '0.9rem' }}>{flat.type} • Block {flat.block}</p>
                                </div>
                                <span style={{
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    background: flat.status === 'Occupied' ? '#E6FAFA' : flat.status === 'Vacant' ? '#FFEAEA' : '#FFF4E6',
                                    color: flat.status === 'Occupied' ? '#00D09C' : flat.status === 'Vacant' ? '#FF5B5B' : '#FF9F43'
                                }}>
                                    {flat.status}
                                </span>
                            </div>

                            <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '1rem', marginTop: '1rem' }}>
                                <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.3rem' }}>Owner</p>
                                <p style={{ fontWeight: '600', color: '#555' }}>{flat.owner}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
