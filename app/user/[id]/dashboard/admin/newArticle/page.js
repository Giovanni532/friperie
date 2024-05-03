'use client'

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { redirect } from 'next/navigation';
import { IsAdmin } from '@/app/utils/(server)/isAdmin';
import FormArticle from './components/FormArticle';

export default function Page() {
    const { user } = useAuthContext();
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (user){
            IsAdmin(user.email)
            .then(result => {
                setAdmin(result);
                admin ? setLoading(true) : setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [user])


    if(loading){
        return <p>En cours de verification ..</p>
    } else if (admin && !loading) {
        return <FormArticle/>
    } else {
        redirect('/')
    }
}
