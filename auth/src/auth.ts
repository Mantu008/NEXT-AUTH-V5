import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbconnect from "./lib/dbConnect";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { User } from "./models/userModel";
import bcrypt from 'bcryptjs';

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            // Include other properties if needed
        };
    }

    interface User {
        role: string;
        // Add other properties as necessary
    }

    interface JWT {
        role: string;
        // Add other properties as necessary
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;

                if (!email || !password) {
                    throw new CredentialsSignin("Please Provide Both Email & Password");
                }

                await dbconnect();

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

                return userData;
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role as string;  // Ensure `user.role` is a string
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.sub && token?.role) {
                session.user.id = token.sub as string; // Explicitly cast `token.sub` as string
                session.user.role = token.role as string; // Explicitly cast `token.role` as string
            }
            return session;
        },

        signIn: async ({ user, account }) => {

            if (account?.provider === "google") {
                try {

                    const { email, name, image, id } = user;
                    await dbconnect();
                    const userExists = await User.findOne({ email });

                    if (!userExists) {
                        await User.create({ email, name, image, authProviderId: id })
                    } else {
                        return true;
                    }

                } catch (error) {
                    throw new Error("Error while creating user")
                }
            }

            if (account?.provider === "github") {
                try {

                    const { email, name, image, id } = user;
                    await dbconnect();
                    const userExists = await User.findOne({ email });

                    if (!userExists) {
                        await User.create({ email, name, image, authProviderId: id })
                    } else {
                        return true;
                    }

                } catch (error) {
                    throw new Error("Error while creating user")
                }
            }

            if (account?.provider === "credentials") {

                return true;


            } else {
                return false;
            }


        }
    }
});

