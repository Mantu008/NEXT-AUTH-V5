"use client";

import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handledbconnect = () => {
        toast.success("Redirected To Login page..");
        router.push("/login");
    };

    return (
        <div className="">
            <Button variant="outline" onClick={handledbconnect}>
                Login
            </Button>
            <Toaster />
        </div>
    );
}
