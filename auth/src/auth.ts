import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import axios from "axios"


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
                // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;


                if (!email || !password) {
                    throw new CredentialsSignin("Please Provide Both Email & Password");
                }



                const response = await axios.post("https://next-auth-v5-git-main-mantu008s-projects.vercel.app/api/signin", {
                    email,
                    password
                });

                const userData = response.data;

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
            if (account?.provider === "google" || account?.provider === "github") {
                try {
                    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
                    const { email, name, image, id } = user;
                    const response = await axios.post("https://next-auth-v5-lac.vercel.app/api/providerLogin", {
                        email,
                        name,
                        image,
                        id
                    });
                    console.log(response);
                    return true;  // Ensure to return true on successful sign-in
                } catch (error) {
                    console.error("Error while creating user:", error);
                    return false;
                }
            }

            if (account?.provider === "credentials") {
                return true;
            }

            return false;
        }

    }
});

