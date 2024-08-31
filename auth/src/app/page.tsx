"use client";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
    const handledbconnect = async () => {
        toast.success("ok");
    };

    return (
        <div className="flex flex-col justify-center items-center mt-[200px] gap-10">
            <h1>hello</h1>
            <Button variant="outline" onClick={handledbconnect}>
                Button
            </Button>
            <Toaster />
        </div>
    );
}
