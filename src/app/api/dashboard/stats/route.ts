import { NextResponse } from 'next/server';
import { getUsers, getComplaints, getNotices } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const users = getUsers();
        const complaints = getComplaints();

        console.log('Users count:', users.length);
        console.log('Complaints count:', complaints.length);

        // Calculate stats
        const residents = users.filter((u: any) => u.role === 'resident');
        const uniqueFlats = new Set(residents.map((u: any) => u.flat));

        const openComplaints = complaints.filter((c: any) => c.status !== 'Resolved').length;

        console.log('Occupied Flats:', uniqueFlats.size);
        console.log('Open Complaints:', openComplaints);

        // Mocking financial data for now as we don't have a full billing system
        const pendingDues = "₹ 2.4L";

        return NextResponse.json({
            totalFlats: 150, // Assuming total capacity
            occupiedFlats: uniqueFlats.size,
            pendingDues,
            openComplaints
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
