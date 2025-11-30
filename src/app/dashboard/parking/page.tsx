"use client";
import { useState, useEffect } from 'react';
import { Car, Bike, Check, AlertCircle, Trash2 } from 'lucide-react';

export default function AdminParkingPage() {
    const [slots, setSlots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [assigningSlot, setAssigningSlot] = useState<string | null>(null);
    const [assignFlat, setAssignFlat] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newSlotNumber, setNewSlotNumber] = useState('');
    const [newSlotType, setNewSlotType] = useState('Car');

    useEffect(() => {
        fetchParking();
    }, []);

    const fetchParking = async () => {
        try {
            const res = await fetch('/api/parking');
            if (res.ok) {
                const data = await res.json();
                setSlots(data);
            }
        } catch (error) {
            console.error('Error fetching parking:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSlot = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/parking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'add_slot', slotNumber: newSlotNumber, type: newSlotType })
            });

            if (res.ok) {
                fetchParking();
                setShowAddModal(false);
                setNewSlotNumber('');
                setNewSlotType('Car');
            } else {
                alert('Failed to add slot (maybe duplicate?)');
            }
        } catch (error) {
            console.error('Error adding slot:', error);
        }
    };

    const handleAssign = async (slotId: string) => {
        if (!assignFlat) return;
        try {
            const res = await fetch('/api/parking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'assign', slotId, flat: assignFlat })
            });

            if (res.ok) {
                fetchParking();
                setAssigningSlot(null);
                setAssignFlat('');
            } else {
                alert('Failed to assign slot');
            }
        } catch (error) {
            console.error('Error assigning slot:', error);
        }
    };

    const handleDeleteSlot = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this parking slot?')) {
            try {
                const res = await fetch(`/api/parking?id=${id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    fetchParking();
                } else {
                    alert('Failed to delete slot');
                }
            } catch (error) {
                console.error('Error deleting slot:', error);
            }
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading parking data...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b' }}>Parking Management</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    style={{
                        background: '#1a2b4b', color: 'white', border: 'none', padding: '0.8rem 1.5rem',
                        borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    + Add Slot
                </button>
            </div>

            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', width: '400px' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#1a2b4b' }}>Add New Parking Slot</h2>
                        <form onSubmit={handleAddSlot} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Slot Number</label>
                                <input
                                    type="text"
                                    placeholder="e.g. C-1"
                                    required
                                    value={newSlotNumber}
                                    onChange={(e) => setNewSlotNumber(e.target.value)}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Type</label>
                                <select
                                    value={newSlotType}
                                    onChange={(e) => setNewSlotType(e.target.value)}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                >
                                    <option value="Car">Car</option>
                                    <option value="Bike">Bike</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                <button type="submit" style={{ flex: 1, background: '#00D09C', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Add Slot</button>
                                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#f0f0f0', color: '#666', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {slots.map(slot => (
                    <div key={slot.id} style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                        borderLeft: `5px solid ${slot.status === 'Available' ? '#00D09C' : '#FF5B5B'}`,
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1a2b4b' }}>{slot.slotNumber}</h3>
                                <span style={{ fontSize: '0.9rem', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {slot.type === 'Car' ? <Car size={14} /> : <Bike size={14} />} {slot.type} Slot
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    background: slot.status === 'Available' ? '#E6FAFA' : '#FFE5E5',
                                    color: slot.status === 'Available' ? '#00D09C' : '#FF5B5B'
                                }}>
                                    {slot.status}
                                </span>
                                <button
                                    onClick={() => handleDeleteSlot(slot.id)}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer', color: '#FF5B5B',
                                        padding: '4px', display: 'flex', alignItems: 'center'
                                    }}
                                    title="Delete Slot"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {slot.status === 'Occupied' ? (
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0' }}>
                                <p style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>Assigned to: {slot.flat}</p>
                                {slot.vehicleNumber ? (
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                        <p>Vehicle: {slot.vehicleNumber}</p>
                                        <p>Model: {slot.vehicleModel}</p>
                                    </div>
                                ) : (
                                    <p style={{ fontSize: '0.8rem', color: '#FF9F43', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <AlertCircle size={12} /> Vehicle not registered
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div style={{ marginTop: '1rem' }}>
                                {assigningSlot === slot.id ? (
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input
                                            type="text"
                                            placeholder="Flat (e.g. A-101)"
                                            value={assignFlat}
                                            onChange={(e) => setAssignFlat(e.target.value)}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                        />
                                        <button onClick={() => handleAssign(slot.id)} style={{ background: '#00D09C', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer' }}><Check size={16} /></button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setAssigningSlot(slot.id)}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #1a2b4b', background: 'none', color: '#1a2b4b', fontWeight: '600', cursor: 'pointer' }}
                                    >
                                        Assign Slot
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
