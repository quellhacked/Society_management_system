import { NextResponse } from 'next/server';
import { getUsers, updateUserRole } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const users = getUsers();
    // Remove sensitive data like passwords
    const safeUsers = users.map(({ password, ...user }) => user);
    return NextResponse.json(safeUsers);
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, role } = body;

        if (!id || !role) {
            return NextResponse.json({ error: 'Missing id or role' }, { status: 400 });
        }

        // Map frontend role names to backend role IDs if necessary
        // Frontend: 'Admin', 'Secretary', 'Accountant', 'Staff', 'Resident'
        // Backend: 'admin', 'co-admin', 'accountant', 'staff', 'resident'

        let dbRole = role.toLowerCase();
        if (dbRole === 'secretary') dbRole = 'co-admin';

        const updatedUser = updateUserRole(id.toString(), dbRole);

        if (!updatedUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
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

        const { deleteUser } = await import('@/lib/db');
        const success = deleteUser(id);

        if (!success) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, flat, role, phone } = body;

        if (!name || !email || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate random password
        const password = Math.random().toString(36).slice(-8);

        const { addUser } = await import('@/lib/db');
        const { sendWelcomeEmail } = await import('@/lib/email');

        const newUser = addUser({
            name,
            email,
            flat: flat || '',
            role,
            phone: phone || '',
            type: role === 'resident' ? 'Owner' : 'Staff', // Default type
            password // In a real app, hash this!
        });

        if (!newUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Send email
        const emailResult = await sendWelcomeEmail(email, name, password);

        return NextResponse.json({
            success: true,
            user: newUser,
            emailPreview: emailResult.previewUrl // Return preview URL for testing
        });

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
