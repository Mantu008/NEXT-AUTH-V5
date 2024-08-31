"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent } from "react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

const Login = () => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submission
        toast.success("Login Successful 👍");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black py-6 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h1 className="text-3xl font-extrabold text-center text-black">
                    Login
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                    </div>
                    <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        Login
                    </Button>
                </form>
                <p className="text-center text-gray-500 text-sm">
                    Don&#39;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-gray-900 hover:text-gray-700 font-medium"
                    >
                        Register
                    </Link>
                </p>

                <section className="flex flex-row gap-5  justify-center text-center">
                    <Button>
                        <IconBrandGithub />
                        <span>GitHub</span>
                    </Button>
                    <Button>
                        <IconBrandGoogle />
                        <span>Google</span>
                    </Button>
                    <Button>
                        <IconBrandGithub />
                        <span>GitHub</span>
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default Login;
