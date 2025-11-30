import { NextResponse } from 'next/server';
import { addUser } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, flat, phone, type } = body;

        // Basic validation
        if (!name || !email || !password || !flat || !phone || !type) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create user object
        const newUser = {
            name,
            email,
            password, // In a real app, hash this!
            flat,
            phone,
            type, // 'Owner' or 'Tenant'
            role: 'resident' // Default role
        };

        const createdUser = addUser(newUser);

        if (!createdUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: 'Registration successful', user: createdUser },
            { status: 201 }
        );

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
