"use client"
import { Inter as FontSans } from "next/font/google"


import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { AuthContextProvider } from "./AuthProvider";
import NavbarAdmin from "../components/navbar/NavbarAdmin";
import { getCookie } from "cookies-next";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})


export default function LayoutProvider({ children }) {
    const isAdmin = getCookie("admin")
    console.log(isAdmin)
    const url = usePathname();
    const urlAdmin = url.startsWith("/admin");

    return (
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
            <AuthContextProvider>
                {isAdmin && urlAdmin ? <NavbarAdmin /> : <Navbar />}
                {children}
                <Toaster />
            </AuthContextProvider>
        </body>
    );
}