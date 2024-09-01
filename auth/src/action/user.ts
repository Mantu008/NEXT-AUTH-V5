"use server"

import dbconnect from "@/lib/dbConnect"
import { User } from "@/models/userModel"
import bcrypt from 'bcrypt'

interface userData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const register = async (data: userData) => {
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