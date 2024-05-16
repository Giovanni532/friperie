'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebaseDb from '../db/config';
import { IsAdmin } from '../utils/(server)/isAdmin';

const auth = getAuth(firebaseDb);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setIsLoading(true);
            if (user) {
                setUser(user);
                try {
                    const result = await IsAdmin(user.email);
                    setIsAdmin(result);
                } catch (error) {
                    console.error("Erreur lors de la vérification de l'administrateur :", error);
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <p>En attente de données ...</p>;
    }

    return (
        <AuthContext.Provider value={{ user, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
