import dbconnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import bcrypt from 'bcryptjs';



export async function POST(request: Request) {
    await dbconnect();

    try {
        const { email, password } = await request.json();

        console.log(email, password)

        const user = await User.findOne({ email }).select("+password +role");

        if (!user) {
            throw new Error("Invalid email or password");
        }

        if (!user.password) {
            throw new Error("Invalid email or password");
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            throw new Error("Password did not match");
        }

        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            id: user._id.toString()  // Convert _id to string
        }

        return new Response(JSON.stringify(userData), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.log("Error Login user", error);

        return new Response(JSON.stringify({
            success: false,
            message: "Error Login User"
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}