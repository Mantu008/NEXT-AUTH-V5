"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/user";
import { logOut } from "@/action/user";

interface User {
    id: string;
    role: string;
}

const NavBar = () => {
    const router = useRouter();
    const [sessionData, setSessionData] = useState<User | null | undefined>(
        undefined
    ); // Initial state is `undefined`

    // Fetch session data on component mount
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const session = await getAuthSession();
                setSessionData(session?.user || null); // Set session data if user exists, or `null` otherwise
            } catch (error) {
                console.error("Failed to fetch session:", error);
                setSessionData(null); // Set to null if there's an error (treated as not logged in)
            }
        };

        fetchSession(); // Call fetch function once on mount
    }, []);

    // Handle user logout
    const handleLogout = async () => {
        await logOut();
        setSessionData(null); // Clear session data after logout
        router.push("/login"); // Redirect to login page after logout
    };

    // If session data is `undefined`, the session is still being checked; don't render NavBar yet
    if (sessionData === undefined) {
        return null; // Don't render anything until session is determined
    }

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side with the logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <img
                                src="../favicon.ico" // Replace with your logo source
                                alt="Logo"
                                width={50}
                                height={50}
                                className="cursor-pointer"
                            />
                        </Link>
                    </div>

                    {/* Right side with navigation links */}
                    <div className="flex items-center space-x-6">
                        {sessionData ? (
                            <>
                                {/* Show if user is logged in */}
                                <Link
                                    href="/private/dashboard"
                                    className="text-gray-100 hover:text-white transition duration-300"
                                >
                                    Dashboard
                                </Link>
                                <Button
                                    className="text-gray-100 border-gray-100 hover:bg-gray-700 transition duration-300"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                {/* Show if user is not logged in */}
                                <Link
                                    href="/register"
                                    className="text-gray-100 hover:text-white transition duration-300"
                                >
                                    Register
                                </Link>
                                <Link
                                    href="/login"
                                    className="text-gray-100 hover:text-white transition duration-300"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
