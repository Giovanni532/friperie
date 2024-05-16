
import { Inter as FontSans } from "next/font/google"


import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { AuthContextProvider } from "./AuthProvider";
import Navbar from "../components/navbar/Navbar";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})


export default function LayoutProvider({ children }) {

    return (
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
            <AuthContextProvider>
                <Navbar/>
                {children}
                <Toaster />
            </AuthContextProvider>
        </body>
    );
}