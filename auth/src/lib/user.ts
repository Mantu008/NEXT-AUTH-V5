"use server"
import { auth } from "@/auth";

export async function getAuthSession() {
    return await auth();
}