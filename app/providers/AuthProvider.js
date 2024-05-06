'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebaseDb from '../db/config';
import Navbar from '../components/navbar/Navbar';
import { IsAdmin } from '../utils/(server)/isAdmin';

const auth = getAuth(firebaseDb);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                IsAdmin(user.email)
                .then(result => {
                    setIsAdmin(result);
                })
                setIsLoading(false);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (isLoading){
        return (
            <div>
            <Navbar/>
            <p>En attente de données ...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};