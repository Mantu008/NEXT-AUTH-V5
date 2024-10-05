// /api/auth/update-password.ts
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import bcrypt from "bcrypt";

// POST /api/auth/update-password
export async function POST(request: Request) {
    await dbConnect();

    try {
        const { token, email, password } = await request.json();

        if (!token || !email || !password) {
            return new Response(JSON.stringify({ message: "Invalid data" }), { status: 400 });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        // Check if the reset token is valid and has not expired
        const isValidToken = await bcrypt.compare(token, user.resetPasswordToken);
        if (!isValidToken || user.resetPasswordExpires < Date.now()) {
            return new Response(JSON.stringify({ message: "Token is invalid or has expired" }), { status: 400 });
        }

        // Hash the new password and update the user's record
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Clear reset token
        user.resetPasswordExpires = undefined; // Clear token expiration
        await user.save();

        return new Response(JSON.stringify({ success: true, message: "Password reset successful" }), { status: 200 });
    } catch (error) {
        console.error("Error resetting password:", error);
        return new Response(JSON.stringify({ message: "Error resetting password" }), { status: 500 });
    }
}
