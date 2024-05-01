"use client"

import React from 'react';
import Link from 'next/link';
import { useAuthContext } from '../providers/AuthProvider';
import logout from '../db/auth/logout';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout()
            .then(() => {
                router.push('/')
            })
    }
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Left section */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Accueil</Link>
                                <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">À propos</Link>
                                <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                            </div>
                        </div>
                    </div>

                    {/* Middle section */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</Link>
                            <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center">
                                <Link href={`/user/${user.uid}/profile`} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Mon compte</Link>
                                <Button onClick={handleLogout} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Déconnexion</Button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <Link href="/auth" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Connexion</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
