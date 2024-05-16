'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"


export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <div className="text-7xl font-bold text-gray-900 dark:text-gray-50">404</div>
            <div className="text-xl font-semibold text-gray-500 dark:text-gray-400">Oops! Page not found.</div>
            <Button asChild>
                <Link href="/">Retour sur la page principale</Link>
            </Button>
        </div>
    )
}