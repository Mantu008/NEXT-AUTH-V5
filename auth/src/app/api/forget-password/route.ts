import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import crypto from 'crypto'; // For generating token
import nodemailer from 'nodemailer'; // For sending emails
import bcrypt from 'bcrypt';

// POST /api/auth/reset-password
export async function POST(request: Request) {
    // Connect to the database
    await dbConnect();

    try {
        const { email } = await request.json();

        console.log("api called", email)

        if (!email) {
            return new Response(JSON.stringify({ message: 'Please provide an email' }), { status: 400 });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // Generate a password reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(resetToken, 10);

        // Save token and expiration time in the user record
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        console.log(process.env.GMAIL_USER);
        console.log(process.env.GMAIL_PASS)

        // Send an email with the reset token
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 587,  // Change to 587 for TLS
            secure: false,  // Use TLS, not SSL
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });



        const resetUrl = `https://next-auth-v5-git-main-mantu008s-projects.vercel.app/reset-password?token=${resetToken}&email=${user.email}`;

        const mailOptions = {
            to: user.email,
            from: 'no-reply@yourapp.com',
            subject: 'Password Reset Request',
            text: `You are receiving this because you (or someone else) have requested a password reset for your account.\n\n
                Please click on the following link, or paste it into your browser to complete the process:\n\n
                ${resetUrl}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: 'Password reset email sent' }), { status: 200 });
    } catch (error) {
        console.error('Error sending reset email:', error);
        return new Response(JSON.stringify({ message: 'Error sending reset email' }), { status: 500 });
    }
}
