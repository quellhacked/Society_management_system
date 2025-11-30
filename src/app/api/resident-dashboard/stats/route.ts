import { NextResponse } from 'next/server';
import { getUsers, getParkingSlots, getNotices } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const flat = searchParams.get('flat');

        if (!flat) {
            return NextResponse.json({ error: 'Flat is required' }, { status: 400 });
        }

        const users = getUsers();
        const parking = getParkingSlots();
        const notices = getNotices();

        // Stats for the specific resident
        const membersCount = users.filter((u: any) => u.flat === flat).length;
        const myParking = parking.find((p: any) => p.flat === flat);
        const recentNotices = notices.slice(0, 3); // Get top 3 notices

        return NextResponse.json({
            membersCount,
            parkingSlot: myParking ? `${myParking.slotNumber} (${myParking.floor})` : 'Not Allocated',
            recentNotices
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch resident stats' }, { status: 500 });
    }
}
