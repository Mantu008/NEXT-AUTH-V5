"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent } from "react";
import { sendPasswordResetEmail } from "@/action/user"; // Adjust to your API

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const result = await sendPasswordResetEmail({ email });

            if (result?.error) {
                toast.error(result.error);
                return;
            }

            toast.success("Password reset link sent to your email");

            setEmail("");
        } catch (error) {
            toast.error("Error sending password reset email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black py-6 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h1 className="text-3xl font-extrabold text-center text-black">
                    Forgot Password
                </h1>
                <form className="space-y-6" onSubmit={handleForgotPassword}>
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
                    <Button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Forgot Password"}
                    </Button>
                </form>
                <p className="text-center text-gray-500 text-sm">
                    Remember your password?{" "}
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

export default ForgotPassword;
