import { NextResponse } from 'next/server';
import { getBookings, addBooking } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const bookings = getBookings();
    return NextResponse.json(bookings);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { facilityId, facilityName, userId, userName, date, timeSlot } = body;

        if (!facilityId || !userId || !date || !timeSlot) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newBooking = addBooking({
            facilityId,
            facilityName,
            userId,
            userName,
            date,
            timeSlot,
            createdAt: new Date().toISOString()
        });

        if (!newBooking) {
            return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
        }

        return NextResponse.json({ success: true, booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
        }

        const { updateBookingStatus } = await import('@/lib/db');
        const updatedBooking = updateBookingStatus(id, status);

        if (!updatedBooking) {
            return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
        }

        return NextResponse.json({ success: true, booking: updatedBooking });
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
