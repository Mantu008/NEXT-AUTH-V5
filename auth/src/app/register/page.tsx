"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent } from "react";
import { register } from "@/action/user";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners"; // Import the spinner
import { getAuthSession } from "@/lib/user";

const Register = async () => {
    // State variables for form inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // State to manage spinner
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const sessionData = await getAuthSession();
            const user = sessionData?.user;

            if (user) {
                router.push("/");
            }
        };

        checkUser();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submission

        if (!firstName || !lastName || !email || !password) {
            toast.error("Please Fill All the Fields");
            return;
        }

        const user = {
            firstName,
            lastName,
            email,
            password,
        };

        try {
            setLoading(true); // Start spinner
            const createdUser = await register(user);
            console.log(createdUser);

            if (createdUser.userExist) {
                toast.error("User Already Exist With Given Email");
                return;
            }

            toast.success("Registered Successfully 👍");

            // Reset form values
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            router.push("/login");
        } catch (e: any) {
            toast.error("Server error...");
            console.log(e.message);
        } finally {
            setLoading(false); // Stop spinner
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black py-6 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h1 className="text-3xl font-extrabold text-center text-black">
                    Register
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Label
                                htmlFor="firstName"
                                className="block text-gray-900 text-sm font-medium mb-1"
                            >
                                First Name
                            </Label>
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <Label
                                htmlFor="lastName"
                                className="block text-gray-900 text-sm font-medium mb-1"
                            >
                                Last Name
                            </Label>
                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <Label
                            htmlFor="email"
                            className="block text-gray-900 text-sm font-medium mb-1"
                        >
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="password"
                            className="block text-gray-900 text-sm font-medium mb-1"
                        >
                            Password
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        disabled={loading} // Disable button during loading
                    >
                        {loading ? (
                            <ClipLoader color="white" size={20} /> // Show spinner
                        ) : (
                            "Sign Up" // Show button text when not loading
                        )}
                    </Button>
                </form>
                <p className="text-center text-gray-500 text-sm">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-gray-900 hover:text-gray-700 font-medium"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
