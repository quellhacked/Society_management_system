import nodemailer from 'nodemailer';

export async function sendWelcomeEmail(email: string, name: string, password: string) {
    try {
        // Create a test account on Ethereal
        const testAccount = await nodemailer.createTestAccount();

        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        // Send mail
        const info = await transporter.sendMail({
            from: '"Society Management" <admin@society.com>',
            to: email,
            subject: "Welcome to Society Management System",
            text: `Hello ${name},\n\nYour account has been created.\n\nLogin Details:\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after login.\n\nRegards,\nAdmin`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #1a2b4b;">Welcome to Society Management System</h2>
                    <p>Hello <strong>${name}</strong>,</p>
                    <p>Your account has been successfully created by the administrator.</p>
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>
                    </div>
                    <p>Please log in and change your password immediately.</p>
                    <br>
                    <p>Regards,<br>Society Admin</p>
                </div>
            `,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return { success: true, previewUrl: nodemailer.getTestMessageUrl(info) };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}
