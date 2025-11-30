"use client";
import { Shield, Users, CreditCard, MessageSquare, FileText, Bell } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: <Users size={32} />,
            title: "Resident Management",
            desc: "Comprehensive directory of owners and tenants with easy profile management.",
            color: "#4F46E5",
            bg: "#EEF2FF"
        },
        {
            icon: <CreditCard size={32} />,
            title: "Accounting & Billing",
            desc: "Automated maintenance billing, expense tracking, and financial reports.",
            color: "#059669",
            bg: "#ECFDF5"
        },
        {
            icon: <MessageSquare size={32} />,
            title: "Communication Hub",
            desc: "Instant announcements, community polls, and group discussions.",
            color: "#D97706",
            bg: "#FFFBEB"
        },
        {
            icon: <Shield size={32} />,
            title: "Visitor Security",
            desc: "Digital gate pass system to track visitors and enhance security.",
            color: "#DC2626",
            bg: "#FEF2F2"
        },
        {
            icon: <FileText size={32} />,
            title: "Document Repository",
            desc: "Secure storage for society bylaws, meeting minutes, and forms.",
            color: "#2563EB",
            bg: "#EFF6FF"
        },
        {
            icon: <Bell size={32} />,
            title: "Smart Alerts",
            desc: "Emergency notifications and critical updates sent directly to residents.",
            color: "#7C3AED",
            bg: "#F5F3FF"
        }
    ];

    return (
        <section style={{ padding: '5rem 2rem', background: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1rem' }}>
                        Everything you need to manage your society
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        A complete suite of tools designed to make community living smarter, safer, and more efficient.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {features.map((feature, idx) => (
                        <div key={idx} style={{
                            padding: '2rem',
                            borderRadius: '16px',
                            background: 'white',
                            border: '1px solid #eee',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'default'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '12px',
                                background: feature.bg,
                                color: feature.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '0.5rem' }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
