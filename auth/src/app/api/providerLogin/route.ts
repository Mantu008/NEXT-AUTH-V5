import dbconnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";

export async function POST(request: Request) {
    await dbconnect();

    const { email, name, image, id } = await request.json();
    console.log(email, name, image, id);

    const userExists = await User.findOne({ email });

    if (!userExists) {
        const newUser = await User.create({ email, name, image, authProviderId: id });
        return new Response(JSON.stringify(newUser), { status: 200 });
    } else {
        return new Response(JSON.stringify(userExists), { status: 200 });
    }
}