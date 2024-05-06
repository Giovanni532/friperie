'use client'

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { redirect } from 'next/navigation';
import getMultipleData from '@/app/db/request/getMultipleData';

export default function Page() {
    const { user, isAdmin } = useAuthContext();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if(!isAdmin){
            return redirect('/')
        } else {
            getMultipleData("article")
            .then(result => {
                const { resultGetMultipleData } = result;
                setArticles(resultGetMultipleData)
            })
        }
    }, [])

    console.log(articles)
    return <h1> Bienvenue {user.email}</h1>
}
