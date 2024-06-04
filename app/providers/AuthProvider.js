
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
        setIsLoading(false);
    }, [isLoading]);

    return (
        <AuthContext.Provider value={{ user, isAdmin, userLogged }}>
            {isLoading ? (
                <Spinner message="Récupération des données ..." />
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
