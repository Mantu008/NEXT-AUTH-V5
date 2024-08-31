"use client";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Left side with copyright information */}
                    <div className="text-sm text-gray-400 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} MyShop. All rights
                        reserved.
                    </div>
                    {/* Right side with navigation links */}
                    <div className="flex space-x-6">
                        <Link
                            href="/about"
                            className="text-gray-300 hover:text-white transition duration-300"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-300 hover:text-white transition duration-300"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-gray-300 hover:text-white transition duration-300"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-gray-300 hover:text-white transition duration-300"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
