"use client";

import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handledbconnect = () => {
        toast.success("Redirecting to login page...");
        router.push("/login");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
                <h1 className="text-5xl font-bold mb-4">Welcome to Our App</h1>
                <p className="text-lg mb-6">
                    Manage your products efficiently and effortlessly.
                </p>
                <Button onClick={handledbconnect}>Get Started</Button>
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
                                "This app has revolutionized the way we manage
                                our products. It's simple, intuitive, and
                                extremely powerful."
                            </p>
                            <p className="font-bold">- Jane Doe</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <p className="italic mb-4">
                                "The analytics dashboard gives me everything I
                                need to track my product performance in
                                real-time."
                            </p>
                            <p className="font-bold">- John Smith</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <p className="italic mb-4">
                                "Collaborating with my team has never been
                                easier. We can assign roles and manage
                                permissions effortlessly."
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
                    <Button onClick={handledbconnect}>Create an Account</Button>
                </div>
            </section>

            <Toaster />
        </div>
    );
}
