import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    console.log(`Middleware: Path ${pathname}, Token:`, token ? 'Found' : 'Missing');

    // Protect Admin Dashboard
    if (pathname.startsWith('/dashboard')) {
        const allowedRoles = ['admin', 'co-admin', 'accountant', 'staff'];
        if (!token || !allowedRoles.includes(token.role as string)) {
            console.log('Middleware: Redirecting to admin-login');
            return NextResponse.redirect(new URL('/admin-login', req.url));
        }
    }

    // Protect Resident Dashboard
    if (pathname.startsWith('/resident-dashboard')) {
        if (!token || token.role !== 'resident') {
            return NextResponse.redirect(new URL('/resident-login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/resident-dashboard/:path*'],
};
