import { MoreHorizontal } from 'lucide-react';

interface StatsCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    iconBg: string;
    iconColor: string;
}

export default function StatsCard({ icon, value, label, iconBg, iconColor }: StatsCardProps) {
    return (
        <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            position: 'relative',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer' }}>
                <MoreHorizontal size={20} color="#ccc" />
            </div>

            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: iconColor
            }}>
                {icon}
            </div>

            <div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b', lineHeight: '1.2' }}>{value}</h3>
                <p style={{ fontSize: '0.9rem', color: '#888' }}>{label}</p>
            </div>
        </div>
    );
}
