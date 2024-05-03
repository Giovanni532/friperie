import React from "react";
import Link from 'next/link';

export default function LeftSection() {
    return (
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <img className="h-8 w-8" src="/next.svg" alt="Logo" />
            </div>
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                        href="/"
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Accueil
                    </Link>
                    <Link
                        href="#"
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        À propos
                    </Link>
                    <Link
                        href="#"
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Services
                    </Link>
                </div>
            </div>
        </div>
    );
}
