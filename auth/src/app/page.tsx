"use client";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
                <h1 className="text-5xl font-bold mb-4">Welcome to Our App</h1>
                <p className="text-lg mb-6">
                    Manage your products efficiently and effortlessly.
                </p>
                <Link
                    href="/login"
                    className="bg-black p-3 rounded-md text-white"
                >
                    Get Started
                </Link>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold mb-4">
                                Product Management
                            </h3>
                            <p>
                                Keep track of all your products and manage them
                                effortlessly with our powerful tools.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold mb-4">
                                Analytics Dashboard
                            </h3>
                            <p>
                                Analyze product trends and performance with our
                                built-in analytics dashboard.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold mb-4">
                                Easy Collaboration
                            </h3>
                            <p>
                                Work seamlessly with your team, with role-based
                                access control for product data.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gray-200">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">
                        What Our Users Say
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <p className="italic mb-4">
                                &quot;This app has revolutionized the way we
                                manage our products. It&apos;s simple,
                                intuitive, and extremely powerful.&quot;
                            </p>
                            <p className="font-bold">- Jane Doe</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <p className="italic mb-4">
                                &quot;The analytics dashboard gives me
                                everything I need to track my product
                                performance in real-time.&quot;
                            </p>
                            <p className="font-bold">- John Smith</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <p className="italic mb-4">
                                &quot;Collaborating with my team has never been
                                easier. We can assign roles and manage
                                permissions effortlessly.&quot;
                            </p>
                            <p className="font-bold">- Sarah Wilson</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg mb-8">
                        Sign up today and start managing your products like a
                        pro!
                    </p>
                    <Link
                        className="bg-black p-3 rounded-md text-white"
                        href="/register"
                    >
                        Create an Account
                    </Link>
                </div>
            </section>

            <Toaster />
        </div>
    );
}
