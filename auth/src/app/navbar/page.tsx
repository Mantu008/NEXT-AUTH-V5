"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NavBar = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Logic for logging out the user
        router.push("/login"); // Redirect to login page after logout
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
                        <Link
                            href="/private/dashboard"
                            className="text-gray-100 hover:text-white transition duration-300"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/register"
                            className="text-gray-100 hover:text-white transition duration-300"
                        >
                            Register
                        </Link>
                        <Link
                            href="/login"
                            className="text-gray-100 transition duration-300"
                        >
                            Login
                        </Link>
                        <Button
                            className="text-gray-100 border-gray-100 hover:bg-gray-700 transition duration-300"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
