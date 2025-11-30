import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Users, CreditCard, MessageSquare, FileText, Bell, PenTool, BarChart } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        {
            icon: <Users size={40} />,
            title: "Resident & Tenant Management",
            desc: "Maintain a comprehensive digital directory of all owners and tenants. Track move-ins, move-outs, and vehicle registrations seamlessly.",
            color: "#4F46E5",
            bg: "#EEF2FF"
        },
        {
            icon: <CreditCard size={40} />,
            title: "Automated Billing & Accounting",
            desc: "Generate maintenance invoices automatically. Track payments, expenses, and generate financial reports with a single click.",
            color: "#059669",
            bg: "#ECFDF5"
        },
        {
            icon: <Shield size={40} />,
            title: "Gate & Visitor Security",
            desc: "Enhance security with a digital gate pass system. Residents can pre-approve guests, and guards can track all entries and exits.",
            color: "#DC2626",
            bg: "#FEF2F2"
        },
        {
            icon: <MessageSquare size={40} />,
            title: "Community Communication",
            desc: "Foster a connected community with discussion forums, group chats, and instant broadcast alerts for emergencies.",
            color: "#D97706",
            bg: "#FFFBEB"
        },
        {
            icon: <FileText size={40} />,
            title: "Document Repository",
            desc: "A secure cloud storage for all society documents, meeting minutes, bylaws, and forms, accessible to authorized members.",
            color: "#2563EB",
            bg: "#EFF6FF"
        },
        {
            icon: <PenTool size={40} />,
            title: "Facility Booking",
            desc: "Allow residents to book common amenities like the clubhouse, gym, or tennis court online with real-time availability checks.",
            color: "#7C3AED",
            bg: "#F5F3FF"
        },
        {
            icon: <Bell size={40} />,
            title: "Helpdesk & Complaints",
            desc: "A streamlined ticketing system for residents to report issues (plumbing, electrical) and track their resolution status.",
            color: "#DB2777",
            bg: "#FDF2F8"
        },
        {
            icon: <BarChart size={40} />,
            title: "Polls & Surveys",
            desc: "Make democratic decisions by conducting online polls and surveys to gather resident feedback on important matters.",
            color: "#0891B2",
            bg: "#ECFEFF"
        }
    ];

    return (
        <main style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            <Navbar />

            {/* Header */}
            <section style={{ background: '#1a2b4b', color: 'white', padding: '6rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>Our Services</h1>
                <p style={{ fontSize: '1.2rem', color: '#a0aec0', maxWidth: '600px', margin: '0 auto' }}>
                    Comprehensive solutions tailored for modern housing societies.
                </p>
            </section>

            {/* Services Grid */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {services.map((service, idx) => (
                        <div key={idx} style={{
                            background: 'white',
                            padding: '2.5rem',
                            borderRadius: '20px',
                            border: '1px solid #eee',
                            transition: 'all 0.3s ease',
                            cursor: 'default'
                        }}
                            className="service-card"
                        >
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '16px',
                                background: service.bg,
                                color: service.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                {service.icon}
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1rem' }}>
                                {service.title}
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.7', fontSize: '1rem' }}>
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'white', padding: '5rem 2rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '1.5rem' }}>
                        Ready to transform your society?
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2.5rem' }}>
                        Join hundreds of happy communities managing their operations effortlessly.
                    </p>
                    <a href="/admin-login" style={{
                        display: 'inline-block',
                        background: '#00D09C',
                        color: 'white',
                        padding: '1rem 3rem',
                        borderRadius: '50px',
                        fontWeight: '700',
                        fontSize: '1.1rem',
                        textDecoration: 'none',
                        boxShadow: '0 4px 15px rgba(0, 208, 156, 0.4)'
                    }}>
                        Get Started Today
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
