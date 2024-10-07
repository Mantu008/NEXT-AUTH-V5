

"use server"

import { signIn, signOut } from "@/auth"
import dbconnect from "@/lib/dbConnect"
import { User } from "@/models/userModel"
import axios from "axios"
import bcrypt from 'bcryptjs'

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
            password
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

interface SendPasswordResetEmailData {
    email: string;
}


const sendPasswordResetEmail = async (data: SendPasswordResetEmailData) => {
    const { email } = data;

    if (!email) {
        throw new Error("Please fill Email Field");
    }

    try {
        // API call to the backend to send the reset link
        const response = await axios.post("https://next-auth-v5-six-lake.vercel.app/api/forget-password", {
            email,
        });

        return response.data; // Expected response from the backend
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to send reset email");
    }
};

const logOut = async () => {
    await signOut();
}


export { register, login, logOut, sendPasswordResetEmail };