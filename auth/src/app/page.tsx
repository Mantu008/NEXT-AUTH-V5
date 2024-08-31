"use client";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const handledbconnect = async () => {
        toast.success("Redirected To Login page..");
        router.push("/login");
    };

    return (
        <div className="flex flex-col justify-center items-center mt-[200px] gap-10">
            <h1>hello</h1>
            <Button variant="outline" onClick={handledbconnect}>
                Login
            </Button>
            <Toaster />
        </div>
    );
}
