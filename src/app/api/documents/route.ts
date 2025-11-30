import { NextResponse } from 'next/server';
import { getDocuments, addDocument } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const documents = getDocuments();
    return NextResponse.json(documents);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, category, url } = body;

        if (!title || !category || !url) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newDoc = addDocument({ title, category, url });

        if (newDoc) {
            return NextResponse.json({ success: true, document: newDoc });
        } else {
            return NextResponse.json({ error: 'Failed to add document' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in documents API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
