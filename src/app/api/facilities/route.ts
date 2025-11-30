import { NextResponse } from 'next/server';
import { getFacilities } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const facilities = getFacilities();
    return NextResponse.json(facilities);
}
