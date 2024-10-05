"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent } from "react";
import { login } from "@/action/user";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { getAuthSession } from "@/lib/user"; // Import the server-side function

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchSession() {
            const sessionData = await getAuthSession();
            const user = sessionData?.user;

            if (user) {
                router.push("/");
            }
        }

        fetchSession();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            toast.error("Please Fill All the Fields");
            return;
        }

        const user = {
            email,
            password,
        };

        try {
            setLoading(true);
            const result = await login(user);

            if (result?.error) {
                toast.error("Invalid credentials");
                return;
            }

            toast.success("Login Successful 👍");

            setEmail("");
            setPassword("");

            router.push(result.url || "/private/dashboard");
        } catch (e: any) {
            toast.error("Invalid Email or Password");
        } finally {
            setLoading(false);
        }
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
                    {/* Forgot Password Link */}
                    <div className="text-right">
                        <Link
                            href="/forget-password"
                            className="text-gray-500 text-sm hover:text-gray-900"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        disabled={loading}
                    >
                        {loading ? (
                            <ClipLoader color="white" size={20} />
                        ) : (
                            "Login"
                        )}
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

                <section className="flex flex-row gap-5 justify-center text-center">
                    <Button onClick={() => signIn("github")}>
                        <IconBrandGithub />
                        <span>GitHub</span>
                    </Button>

                    <Button onClick={() => signIn("google")}>
                        <IconBrandGoogle />
                        <span>Google</span>
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default Login;
