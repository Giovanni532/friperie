
"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import Spinner from '../components/Spinner';

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const userLogged = (data) => {
        setUser(data);
        setCookie("user", data);
    };

    useEffect(() => {
        const userStored = getCookie('user');
        if (userStored) {
            userLogged(JSON.parse(userStored));
        }
        setIsLoading(false); // Met fin au chargement une fois que la vérification est terminée, qu'il y ait un utilisateur ou non
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAdmin, userLogged }}>
            {isLoading && !user ? (
                <Spinner message="Récupération des données ..." />
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
