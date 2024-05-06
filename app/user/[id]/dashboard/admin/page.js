'use client'

import React, { useEffect } from 'react';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { redirect } from 'next/navigation';

export default function Page() {
    const { user, isAdmin } = useAuthContext();

    useEffect(() => {
        if(!isAdmin){
            redirect('/')
        }
    })

    return <h1> Bienvenue {user.email}</h1>
}
