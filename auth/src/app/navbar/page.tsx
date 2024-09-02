"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/user";
import { useEffect, useState } from "react";
import { logOut } from "@/action/user";

interface User {
    id: string;
    role: string;
}

const NavBar = () => {
    const router = useRouter();
    const [sessionData, setSessionData] = useState<User | null>(null);
    const pathname = usePathname(); // Get the current path

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getAuthSession();
            const user = sessionData?.user || null;
            setSessionData(user);
        };

        fetchSession();
    }, [pathname]); // This runs every time the URL changes (pathname changes)

    const handleLogout = async () => {
        await logOut();
        router.push("/login"); // Redirect to home page after logout
    };

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side with the logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <img
                                src="../favicon.ico" // Replace with your image source
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
