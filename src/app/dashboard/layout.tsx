"use client";
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';
import { useState } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F6FA' }}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="dashboard-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', transition: 'margin-left 0.3s ease' }}>
                <Topbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
