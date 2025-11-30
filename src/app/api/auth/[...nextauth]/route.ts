import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "text" } // 'admin' or 'resident'
            },
            async authorize(credentials) {
                console.log('Authorize called with:', credentials?.username, credentials?.role);

                const { getUsers } = await import('@/lib/db');
                const users = getUsers();

                // Normalize role for comparison (frontend sends 'Admin', backend stores 'admin')
                const requestedRole = credentials?.role?.toLowerCase();

                // Find user by identifier (email or phone)
                const user = users.find(u =>
                    (u.email === credentials?.username || u.phone === credentials?.username)
                );

                // Verify password or OTP
                // Allow login if password matches OR if it's a resident using the default OTP "1234"
                const isValid = user && (
                    user.password === credentials?.password ||
                    (user.role === 'resident' && credentials?.password === '1234')
                );

                if (isValid && user) {
                    // Check if the user has the requested role
                    // Special case: 'resident' login can access if they are a resident
                    // Admin login can access if they have admin/co-admin/accountant/staff role

                    const userRole = user.role.toLowerCase();

                    if (requestedRole === 'resident') {
                        // Allow if user is actually a resident OR if we just want to allow login
                        // For now, strict check:
                        if (userRole === 'resident') {
                            console.log(`Authorize: Resident ${user.name} found`);
                            return { id: user.id, name: user.name, email: user.email, role: user.role, flat: user.flat };
                        }
                    } else {
                        // Admin/Staff login
                        // Check if the user's stored role matches the requested role OR if they are in the allowed admin group
                        // Actually, the login form sends the role they are trying to login AS.
                        // But we should trust the DB role.

                        // If I am a 'staff' in DB, I can login.
                        // If I am 'admin' in DB, I can login.

                        const allowedAdminRoles = ['admin', 'co-admin', 'accountant', 'staff'];
                        if (allowedAdminRoles.includes(userRole)) {
                            console.log(`Authorize: ${userRole} ${user.name} found`);
                            return { id: user.id, name: user.name, email: user.email, role: user.role, flat: user.flat };
                        }
                    }
                }

                console.log('Authorize: User not found or role mismatch');
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.flat = user.flat;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.flat = token.flat;
            }
            return session;
        }
    },
    pages: {
        signIn: '/admin-login', // Default signin page, though we have custom ones
    }
});

export { handler as GET, handler as POST };
