'use client'

import React, { useEffect } from 'react';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { redirect } from 'next/navigation';
import FormArticle from './components/FormArticle';

export default function Page() {
    const { user, isAdmin } = useAuthContext();

    useEffect(() => {
        if(!isAdmin){
            redirect('/')
        }
    })

    return <FormArticle/>
}
