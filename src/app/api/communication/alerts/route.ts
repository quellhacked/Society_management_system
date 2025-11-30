import { NextResponse } from 'next/server';
import { getAlerts, addAlert } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const alerts = getAlerts();
    return NextResponse.json(alerts);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, message, severity, sentBy } = body;

        if (!title || !message || !severity) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newAlert = addAlert({ title, message, severity, sentBy, date: new Date().toISOString().split('T')[0] });

        if (newAlert) {
            return NextResponse.json({ success: true, alert: newAlert });
        } else {
            return NextResponse.json({ error: 'Failed to add alert' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in alerts API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
