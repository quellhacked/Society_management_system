"use client";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { MoreHorizontal } from 'lucide-react';

// --- Data ---
const trendData = [
    { name: 'Oct 2019', inpatients: 1500, outpatients: 2500 },
    { name: 'Nov 2019', inpatients: 2000, outpatients: 3000 },
    { name: 'Dec 2019', inpatients: 1000, outpatients: 4000 },
    { name: 'Jan 2020', inpatients: 1800, outpatients: 2800 },
    { name: 'Feb 2020', inpatients: 2200, outpatients: 3200 },
    { name: 'Mar 2020', inpatients: 2500, outpatients: 4500 },
];

const genderData = [
    { name: 'Male', value: 45, color: '#7B61FF' },
    { name: 'Female', value: 55, color: '#FF9F43' },
];

const timeAdmittedData = [
    { time: '07 am', value: 30 },
    { time: '08 am', value: 80 },
    { time: '09 am', value: 40 },
    { time: '10 am', value: 90 },
    { time: '11 am', value: 50 },
    { time: '12 pm', value: 70 },
];

const divisionData = [
    { name: 'Cardiology', count: 247, icon: '❤️' },
    { name: 'Neurology', count: 164, icon: '🧠' },
    { name: 'Surgery', count: 86, icon: '✂️' },
];

// --- Components ---

export function TrendChart() {
    return (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a2b4b' }}>Outpatients vs. Inpatients Trend</h3>
                <span style={{ fontSize: '0.9rem', color: '#888' }}>Show by months ⌄</span>
            </div>
            <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trendData} barGap={8}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                        <Tooltip cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="outpatients" fill="#00D09C" radius={[4, 4, 0, 0]} barSize={8} />
                        <Bar dataKey="inpatients" fill="#7B61FF" radius={[4, 4, 0, 0]} barSize={8} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7B61FF' }}></span> Inpatients
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00D09C' }}></span> Outpatients
                </div>
            </div>
        </div>
    );
}

export function GenderChart() {
    return (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>Patients by Gender</h3>
            <div style={{ flex: 1, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={genderData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                        >
                            {genderData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Icon */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#888'
                }}>
                    ⚤
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF9F43' }}></span> Female
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7B61FF' }}></span> Male
                </div>
            </div>
        </div>
    );
}

export function TimeAdmittedChart() {
    return (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a2b4b' }}>Time Admitted</h3>
                <span style={{ fontSize: '0.9rem', color: '#888' }}>Today ⌄</span>
            </div>
            <div style={{ height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeAdmittedData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                        <YAxis hide domain={[0, 150]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#FF9F43" strokeWidth={3} dot={{ r: 4, fill: '#FF9F43', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function DivisionList() {
    return (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a2b4b' }}>Patients By Division</h3>
                <span style={{ fontSize: '0.9rem', color: '#888' }}>⌄</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                    <span>Division</span>
                    <span>Pt.</span>
                </div>

                {divisionData.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ color: '#888' }}>{item.icon}</div> {/* Placeholder icons */}
                            <span style={{ fontWeight: '600', color: '#555' }}>{item.name}</span>
                        </div>
                        <span style={{ fontWeight: '700', color: '#1a2b4b' }}>{item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function MonthStatsCard() {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #7B61FF 0%, #9F43FF 100%)',
            borderRadius: '16px',
            padding: '1.5rem',
            height: '100%',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1' }}>3,240</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Patients this month</p>
            </div>

            <div style={{ height: '60px', marginTop: '1rem' }}>
                {/* Simple SVG Sparkline */}
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0 30 Q 10 20, 20 30 T 40 20 T 60 35 T 80 10 T 100 25" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.6" />
                    <circle cx="80" cy="10" r="3" fill="white" />
                </svg>
            </div>
        </div>
    );
}
