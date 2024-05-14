"use client"
import { Inter as FontSans } from "next/font/google"


import React from "react";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import Navbar from "../components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { AuthContextProvider } from "./AuthProvider";
import NavbarAdmin from "../components/navbar/NavbarAdmin";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})


export default function LayoutProvider({ children }) {
    const admin = getCookie("admin");
    const url = usePathname();
    const urlAdmin = url.startsWith("/admin")

    if (admin && urlAdmin) {
        return (
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <AuthContextProvider>
                    <NavbarAdmin/>
                    {children}
                    <Toaster />
                </AuthContextProvider>
            </body>
        )
    }

    return (
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
            <AuthContextProvider>
                <Navbar />
                {children}
                <Toaster />
            </AuthContextProvider>
        </body>
    )

}