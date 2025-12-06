
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    LayoutDashboard, Users, Home, Bell, AlertCircle, CreditCard, FileText, Briefcase, LogOut, Wrench, UserCheck, Calendar, Car, MessageSquare,
    ShieldCheck, Settings, FolderOpen
} from 'lucide-react';

// Add Props interface
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const role = session?.user?.role;

    // Define menu items visibility based on role
    const showAll = role === 'admin' || role === 'co-admin';
    const isAccountant = role === 'accountant';
    const isStaff = role === 'staff';

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99
                    }}
                />
            )}

            <aside style={{
                width: '250px',
                background: '#ffffff',
                borderRight: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem 1rem',
                height: '100vh',
                position: 'fixed', // Fixed for mobile handling
                top: 0,
                left: 0,
                zIndex: 100,
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', // Toggle visibility
                transition: 'transform 0.3s ease',
                // Desktop override
                // @media query needs to be handled via JS style or CSS class since we are using inline styles.
                // However, for desktop we want it always visible.
                // Let's use a conditional style or a class if possible.
                // Since this project uses inline styles mostly, I'll add a check for window width or just let 'layout' handle desktop visibility?
                // Actually, 'layout' expects sidebar to be static on desktop.
                // I will add a 'desktop-sidebar' class to globals.css to force visibility on large screens.
            }} className="sidebar">
                {/* Logo Area */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '3rem',
                    paddingLeft: '0.5rem'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #C04BF2 0%, #8A2BE2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                        S
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a2b4b' }}>SocietyPlus</h4>
                </div>

                {/* Navigation Links */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {role === 'resident' ? (
                        <>
                            <Link href="/resident-dashboard" style={{ textDecoration: 'none' }}>
                                <NavItem icon={<LayoutDashboard size={20} />} label="My Flat" active={pathname === '/resident-dashboard'} />
                            </Link>
                            <Link href="/resident-dashboard/notices" style={{ textDecoration: 'none' }}>
                                <NavItem icon={<Bell size={20} />} label="Notices" active={pathname === '/resident-dashboard/notices'} />
                            </Link>
                            <Link href="/resident-dashboard/complaints" style={{ textDecoration: 'none' }}>
                                <NavItem icon={<AlertCircle size={20} />} label="Complaints" active={pathname === '/resident-dashboard/complaints'} />
                            </Link>
                            <Link href="/resident-dashboard/facilities" style={{ textDecoration: 'none' }}>
                                <NavItem icon={<Calendar size={20} />} label="Facilities" active={pathname === '/resident-dashboard/facilities'} />
                            </Link>
                            <Link href="/resident-dashboard/visitors" style={{ textDecoration: 'none' }}>
                                <NavItem icon={<UserCheck size={20} />} label="Visitors" active={pathname === '/resident-dashboard/visitors'} />
                            </Link>
                            <Link href="/resident-dashboard/parking" style={{ textDecoration: 'none' }}>
                                <NavItem icon={<Car size={20} />} label="My Parking" active={pathname === '/resident-dashboard/parking'} />
                            </Link>
                            <Link href="/resident-dashboard/communication" style={{ textDecoration: 'none' }}>
                                <NavItem icon={<MessageSquare size={20} />} label="Community" active={pathname === '/resident-dashboard/communication'} />
                            </Link>
                            <Link href="/resident-dashboard/maintenance" style={{ textDecoration: 'none' }}>
                                <NavItem icon={<Wrench size={20} />} label="Maintenance" active={pathname === '/resident-dashboard/maintenance'} />
                            </Link>
                            <Link href="/resident-dashboard/documents" style={{ textDecoration: 'none' }}>
                                <NavItem icon={<FolderOpen size={20} />} label="Documents" active={pathname === '/resident-dashboard/documents'} />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                                <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={pathname === '/dashboard'} />
                            </Link>

                            {(showAll) && (
                                <>
                                    <Link href="/dashboard/residents" style={{ textDecoration: 'none' }}>
                                        <NavItem icon={<Users size={20} />} label="Residents" active={pathname === '/dashboard/residents'} />
                                    </Link>
                                    <Link href="/dashboard/staff" style={{ textDecoration: 'none' }}>
                                        <NavItem icon={<Briefcase size={20} />} label="Staff" active={pathname === '/dashboard/staff'} />
                                    </Link>
                                    <Link href="/dashboard/flats" style={{ textDecoration: 'none' }}>
                                        <NavItem icon={<Home size={20} />} label="Flats" active={pathname === '/dashboard/flats'} />
                                    </Link>
                                    <Link href="/dashboard/notices" style={{ textDecoration: 'none' }}>
                                        <NavItem icon={<Bell size={20} />} label="Notices" active={pathname === '/dashboard/notices'} />
                                    </Link>
                                    <Link href="/dashboard/complaints" style={{ textDecoration: 'none' }}>
                                        <NavItem icon={<AlertCircle size={20} />} label="Complaints" active={pathname === '/dashboard/complaints'} />
                                    </Link>
                                    <Link href="/dashboard/facilities" style={{ textDecoration: 'none' }}>
                                        <NavItem icon={<Calendar size={20} />} label="Facilities" active={pathname === '/dashboard/facilities'} />
                                    </Link>
                                    <Link href="/dashboard/visitors" style={{ textDecoration: 'none' }}>
                                        <NavItem icon={<UserCheck size={20} />} label="Visitors" active={pathname === '/dashboard/visitors'} />
                                    </Link>
                                    <Link href="/dashboard/parking" style={{ textDecoration: 'none' }}>
                                        <NavItem icon={<Car size={20} />} label="Parking" active={pathname === '/dashboard/parking'} />
                                    </Link>
                                </>
                            )}

                            {(showAll || isAccountant || isStaff) && (
                                <>
                                    {(showAll || isAccountant) && (
                                        <>
                                            <Link href="/dashboard/accounting" style={{ textDecoration: 'none' }}>
                                                <NavItem icon={<CreditCard size={20} />} label="Accounting" active={pathname === '/dashboard/accounting'} />
                                            </Link>
                                            <Link href="/dashboard/accounting/vendors" style={{ textDecoration: 'none' }}>
                                                <NavItem icon={<Users size={20} />} label="Vendors" active={pathname === '/dashboard/accounting/vendors'} />
                                            </Link>
                                        </>
                                    )}

                                    <Link href="/dashboard/maintenance" style={{ textDecoration: 'none' }}>
                                        <NavItem icon={<FileText size={20} />} label="Maintenance" active={pathname === '/dashboard/maintenance'} />
                                    </Link>

                                    {(showAll || isStaff) && (
                                        <>
                                            <Link href="/dashboard/visitors" style={{ textDecoration: 'none' }}>
                                                <NavItem icon={<UserCheck size={20} />} label="Visitors" active={pathname === '/dashboard/visitors'} />
                                            </Link>
                                            <Link href="/dashboard/complaints" style={{ textDecoration: 'none' }}>
                                                <NavItem icon={<AlertCircle size={20} />} label="Complaints" active={pathname === '/dashboard/complaints'} />
                                            </Link>
                                        </>
                                    )}

                                    {(showAll || isAccountant) && (
                                        <>
                                            <Link href="/dashboard/communication" style={{ textDecoration: 'none' }}>
                                                <NavItem icon={<MessageSquare size={20} />} label="Communication" active={pathname === '/dashboard/communication'} />
                                            </Link>
                                            <Link href="/dashboard/documents" style={{ textDecoration: 'none' }}>
                                                <NavItem icon={<FolderOpen size={20} />} label="Documents" active={pathname === '/dashboard/documents'} />
                                            </Link>
                                            <Link href="/dashboard/settings" style={{ textDecoration: 'none' }}>
                                                <NavItem icon={<Settings size={20} />} label="Settings" active={pathname === '/dashboard/settings'} />
                                            </Link>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </nav>
            </aside>
        </>
    );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '0.8rem 1rem',
            borderRadius: '12px',
            background: active ? '#F4F1FF' : 'transparent',
            color: active ? '#7B61FF' : '#888',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontWeight: active ? '600' : '500',
        }}>
            {icon}
            <span>{label}</span>
        </div>
    );
}
