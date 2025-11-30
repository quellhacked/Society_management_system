"use client";
import { useState } from 'react';
import { Save, Building, Shield } from 'lucide-react';

export default function SettingsPage() {
    const [societyInfo, setSocietyInfo] = useState({
        name: 'CocoCrax Society',
        address: '123, Palm Avenue, Mumbai',
        contact: '+91 98765 43210',
        email: 'admin@cococrax.com'
    });

    const [rules, setRules] = useState(`1. Quiet hours are from 10 PM to 6 AM.
2. Parking is only allowed in designated slots.
3. Guests must be registered at the gate.
4. Maintenance bills must be paid by the 5th of every month.`);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Settings saved successfully!');
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>Society Settings</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Society Profile */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Building size={20} /> Society Profile
                    </h2>
                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Society Name</label>
                            <input
                                type="text" value={societyInfo.name} onChange={e => setSocietyInfo({ ...societyInfo, name: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Address</label>
                            <input
                                type="text" value={societyInfo.address} onChange={e => setSocietyInfo({ ...societyInfo, address: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Contact Number</label>
                            <input
                                type="text" value={societyInfo.contact} onChange={e => setSocietyInfo({ ...societyInfo, contact: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Official Email</label>
                            <input
                                type="email" value={societyInfo.email} onChange={e => setSocietyInfo({ ...societyInfo, email: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <button type="submit" style={{ background: '#1a2b4b', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Save size={18} /> Save Changes
                        </button>
                    </form>
                </div>

                {/* Rules & Regulations */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={20} /> Rules & Regulations
                    </h2>
                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                        <textarea
                            value={rules} onChange={e => setRules(e.target.value)}
                            style={{ width: '100%', flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', resize: 'none', minHeight: '300px', lineHeight: '1.6' }}
                        />
                        <button type="submit" style={{ background: '#00D09C', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Save size={18} /> Update Rules
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
