

"use server"

import { signIn, signOut } from "@/auth"
import dbconnect from "@/lib/dbConnect"
import { User } from "@/models/userModel"
import bcrypt from 'bcryptjs'
import { CredentialsSignin } from "next-auth"

interface userData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}




const register = async (data: userData) => {
    const firstName = data.firstName
    const lastName = data.lastName
    const email = data.email
    const password = data.password

    if (!firstName || !lastName || !email || !password) {
        throw new Error("please fill all the field")
    }

    await dbconnect();

    const existingUsers = await User.findOne({ email });

    if (existingUsers) {
        return { userExist: true }
    }

    //incrept the password 

    const hashPassword = await bcrypt.hash(password, 10)

    await User.create({ firstName, lastName, email, password: hashPassword })

    console.log('User Registered Sucessfully 🥂🥂')

    return { createUser: true }

}



interface UserLoginData {
    email: string;
    password: string;
}

const login = async (data: UserLoginData) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Please fill all the fields");
    }

    try {
        const result = await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email,
            password,
        });


        if (result?.error) {
            throw new Error(result.error);
        }

        return result; // Return the result to the component

    } catch (error: any) {
        console.error("Login error:", error);
        throw new Error(error.message || "Login failed");
    }
};

const logOut = async () => {
    await signOut();
}


export { register, login, logOut };