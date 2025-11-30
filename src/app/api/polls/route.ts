import { NextResponse } from 'next/server';
import { getPolls, createPoll, votePoll } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const polls = getPolls();
    return NextResponse.json(polls);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action } = body;

        if (action === 'create') {
            const { question, options } = body;
            if (!question || !options || !Array.isArray(options)) {
                return NextResponse.json({ error: 'Invalid poll data' }, { status: 400 });
            }
            const newPoll = createPoll({ question, options });
            return NextResponse.json({ success: true, poll: newPoll });
        }

        if (action === 'vote') {
            const { pollId, optionIndex } = body;
            if (!pollId || optionIndex === undefined) {
                return NextResponse.json({ error: 'Missing vote data' }, { status: 400 });
            }
            const updatedPoll = votePoll(pollId, optionIndex);
            return NextResponse.json({ success: true, poll: updatedPoll });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Error in polls API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
