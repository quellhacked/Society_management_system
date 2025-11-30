import { NextResponse } from 'next/server';
import { getTransactions, addTransaction } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const transactions = getTransactions();
    return NextResponse.json(transactions);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, category, amount, description, date } = body;

        if (!type || !category || !amount || !date) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newTransaction = addTransaction(body);

        if (newTransaction) {
            return NextResponse.json({ success: true, transaction: newTransaction });
        } else {
            return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in accounting API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
