import { NextResponse } from 'next/server';
import { getVendors, addVendor } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const vendors = getVendors();
    return NextResponse.json(vendors);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, serviceType, contact } = body;

        if (!name || !serviceType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newVendor = addVendor(body);

        if (newVendor) {
            return NextResponse.json({ success: true, vendor: newVendor });
        } else {
            return NextResponse.json({ error: 'Failed to add vendor' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in vendors API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
