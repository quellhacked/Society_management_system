import { NextResponse } from 'next/server';
import { getParkingSlots, assignSlot, registerVehicle } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const slots = getParkingSlots();
    return NextResponse.json(slots);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action, slotId, flat, vehicleNumber, vehicleModel } = body;

        if (!action) {
            return NextResponse.json({ error: 'Missing action' }, { status: 400 });
        }

        let success = false;

        if (action === 'assign') {
            if (!slotId || !flat) return NextResponse.json({ error: 'Missing slotId or flat' }, { status: 400 });
            success = assignSlot(slotId, flat);
        } else if (action === 'register') {
            if (!slotId || !vehicleNumber || !vehicleModel) return NextResponse.json({ error: 'Missing slotId or vehicle details' }, { status: 400 });
            success = registerVehicle(slotId, vehicleNumber, vehicleModel);
        } else if (action === 'add_slot') {
            const { slotNumber, type } = body;
            if (!slotNumber || !type) return NextResponse.json({ error: 'Missing slot details' }, { status: 400 });
            const { addParkingSlot } = await import('@/lib/db');
            const newSlot = addParkingSlot(slotNumber, type);
            if (newSlot) return NextResponse.json({ success: true, slot: newSlot });
            return NextResponse.json({ error: 'Slot already exists or failed to create' }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in parking API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 });
        }

        const { deleteParkingSlot } = await import('@/lib/db');
        const success = deleteParkingSlot(id);

        if (!success) {
            return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting parking slot:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
