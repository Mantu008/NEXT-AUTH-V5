"use client"; // Only if using App Router (for useState, useSearchParams)

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // For extracting query params
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams(); // Hook for query parameters

    // Fetch the token and email from the URL
    useEffect(() => {
        const tokenParam = searchParams.get("token");
        const emailParam = searchParams.get("email");

        if (tokenParam && emailParam) {
            setToken(tokenParam);
            setEmail(emailParam);
        } else {
            toast.error("Invalid reset link");
            router.push("/login"); // Redirect if token or email is missing
        }
    }, [searchParams, router]);

    const handleResetPassword = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            // Make the API request to reset the password
            const response = await axios.post(
                "https://next-auth-v5-git-main-mantu008s-projects.vercel.app/api/update-password",
                {
                    token,
                    email,
                    password,
                }
            );

            if (response.data.success) {
                toast.success("Password reset successful. Please log in.");
                router.push("/login");
            } else {
                toast.error(response.data.message || "Password reset failed");
            }
        } catch (error) {
            toast.error("Error resetting password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h1 className="text-3xl font-extrabold text-center text-black">
                    Reset Password
                </h1>
                <form className="space-y-6" onSubmit={handleResetPassword}>
                    <div>
                        <Label
                            htmlFor="password"
                            className="block text-gray-900 text-sm font-medium mb-1"
                        >
                            New Password
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="confirmPassword"
                            className="block text-gray-900 text-sm font-medium mb-1"
                        >
                            Confirm New Password
                        </Label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
