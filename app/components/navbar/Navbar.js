"use client"

import React from 'react';
import { useAuthContext } from '../../providers/AuthProvider';
import logout from '../../db/auth/logout';
import { useRouter } from 'next/navigation';
import LeftSection from './LeftSection';
import MidSection from './MidSection';
import RightSection from './RightSection';

const Navbar = () => {
    const router = useRouter();
    const { user, isAdmin } = useAuthContext();

    const handleLogout = async () => {
        router.push('/')
        setTimeout(() => {
            logout()
        }, 500)
    }

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Left section */}
                    <LeftSection/>
                    {/* Middle section */}
                    <MidSection/>
                    {/* Right section */}
                    <RightSection admin={isAdmin} user={user} handleLogout={handleLogout}/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
