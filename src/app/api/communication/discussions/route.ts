import { NextResponse } from 'next/server';
import { getDiscussions, addDiscussion, addReply } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const discussions = getDiscussions();
    return NextResponse.json(discussions);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action } = body;

        if (action === 'create') {
            const { authorId, authorName, title, content } = body;
            if (!title || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

            const newDiscussion = addDiscussion({ authorId, authorName, title, content, date: new Date().toISOString().split('T')[0] });
            return NextResponse.json({ success: true, discussion: newDiscussion });
        } else if (action === 'reply') {
            const { discussionId, authorName, content } = body;
            if (!discussionId || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

            const success = addReply(discussionId, { authorName, content, date: new Date().toISOString().split('T')[0] });
            return NextResponse.json({ success });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Error in discussions API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
