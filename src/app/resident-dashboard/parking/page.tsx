"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Car, Bike, Save } from 'lucide-react';

export default function ResidentParkingPage() {
    const { data: session } = useSession();
    const [mySlot, setMySlot] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (session?.user?.flat) {
            fetchParking();
        }
    }, [session]);

    const fetchParking = async () => {
        try {
            const res = await fetch('/api/parking');
            if (res.ok) {
                const data = await res.json();
                // Find slot assigned to my flat
                const slot = data.find((s: any) => s.flat === session?.user?.flat);
                setMySlot(slot);
                if (slot) {
                    setVehicleNumber(slot.vehicleNumber || '');
                    setVehicleModel(slot.vehicleModel || '');
                }
            }
        } catch (error) {
            console.error('Error fetching parking:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mySlot) return;
        setSaving(true);

        try {
            const res = await fetch('/api/parking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'register',
                    slotId: mySlot.id,
                    vehicleNumber,
                    vehicleModel
                })
            });

            if (res.ok) {
                alert('Vehicle details updated successfully!');
                fetchParking();
            } else {
                alert('Failed to update vehicle details');
            }
        } catch (error) {
            console.error('Error updating vehicle:', error);
            alert('Error updating vehicle');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading parking info...</div>;

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>My Parking</h1>

            {!mySlot ? (
                <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <Car size={48} color="#ccc" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', color: '#555' }}>No Parking Slot Assigned</h3>
                    <p style={{ color: '#888', marginTop: '0.5rem' }}>Please contact the society admin to assign a parking slot for your flat ({session?.user?.flat}).</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Slot Info Card */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#888', marginBottom: '1rem' }}>Assigned Slot</h2>
                        <div style={{ fontSize: '3rem', fontWeight: '800', color: '#1a2b4b', marginBottom: '0.5rem' }}>
                            {mySlot.slotNumber}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555', fontSize: '1.1rem' }}>
                            {mySlot.type === 'Car' ? <Car size={24} /> : <Bike size={24} />}
                            {mySlot.type} Parking
                        </div>
                    </div>

                    {/* Vehicle Registration Form */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1.5rem' }}>Vehicle Registration</h2>
                        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>Vehicle Number Plate</label>
                                <input
                                    type="text"
                                    placeholder="e.g. MH-02-AB-1234"
                                    required
                                    value={vehicleNumber}
                                    onChange={(e) => setVehicleNumber(e.target.value)}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>Vehicle Model</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Honda City"
                                    required
                                    value={vehicleModel}
                                    onChange={(e) => setVehicleModel(e.target.value)}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                style={{
                                    background: '#1a2b4b',
                                    color: 'white',
                                    border: 'none',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Save size={18} /> {saving ? 'Saving...' : 'Update Details'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
