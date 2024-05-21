
import { Inter as FontSans } from "next/font/google"


import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { AuthContextProvider } from "./AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StoreProvider } from "./StoreProvider";

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
            <StoreProvider>
                <AuthContextProvider>
                    <Navbar />
                    {children}
                    <Toaster />
                    <Footer />
                </AuthContextProvider>
            </StoreProvider>
        </body>
    );
}