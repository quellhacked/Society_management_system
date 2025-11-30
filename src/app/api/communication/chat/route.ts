import { NextResponse } from 'next/server';
import { getChatMessages, addChatMessage } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const messages = getChatMessages();
    return NextResponse.json(messages);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { authorName, message, image } = body;

        if (!authorName || (!message && !image)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newMessage = addChatMessage({ authorName, message, image });

        if (newMessage) {
            return NextResponse.json({ success: true, message: newMessage });
        } else {
            return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
