"use client";
import { Bed, Users, Wallet, Ambulance, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import { TrendChart, GenderChart, TimeAdmittedChart, DivisionList, MonthStatsCard } from '../components/dashboard/Charts';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalFlats: 0,
        occupiedFlats: 0,
        pendingDues: '₹ 0',
        openComplaints: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Dashboard: Fetching stats...');
        fetch('/api/dashboard/stats')
            .then(res => {
                console.log('Dashboard: Response status:', res.status);
                return res.json();
            })
            .then(data => {
                console.log('Dashboard: Data received:', data);
                setStats(data);
            })
            .catch(err => console.error('Dashboard: Fetch error:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div style={{ padding: '2rem' }}>Loading dashboard stats...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Top Row: Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '2rem'
            }}>
                <StatsCard
                    icon={<Building2 size={24} />}
                    value={stats.totalFlats.toString()}
                    label="Total Flats"
                    iconBg="#F4F2FF"
                    iconColor="#7B61FF"
                />
                <StatsCard
                    icon={<Users size={24} />}
                    value={stats.occupiedFlats.toString()}
                    label="Occupied"
                    iconBg="#E6FAFA"
                    iconColor="#00D09C"
                />
                <StatsCard
                    icon={<Wallet size={24} />}
                    value={stats.pendingDues}
                    label="Pending Dues"
                    iconBg="#FFF4E6"
                    iconColor="#FF9F43"
                />
                <StatsCard
                    icon={<Ambulance size={24} />}
                    value={stats.openComplaints.toString()}
                    label="Open Complaints"
                    iconBg="#FFEAEA"
                    iconColor="#FF5B5B"
                />
            </div>

            {/* Middle Row: Trend & Gender */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '2rem',
                minHeight: '400px'
            }}>
                <TrendChart />
                <GenderChart />
            </div>

            {/* Bottom Row: Time Admitted, Division, Month Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                minHeight: '300px'
            }}>
                <TimeAdmittedChart />
                <DivisionList />
                <MonthStatsCard />
            </div>

        </div>
    );
}
