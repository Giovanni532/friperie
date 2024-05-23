'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import Spinner from '../components/Spinner';


export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const userLogged = (data) => {
        setUser(data)
        setCookie("user", data)
    }


    useEffect(() => {
        setIsLoading(true);
        const userStored = getCookie('user');
        if (userStored) {
            userLogged(JSON.parse(userStored))
        };
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAdmin, userLogged }}>
            {isLoading ? <Spinner message="Récuperation des données ..."/> : children}
        </AuthContext.Provider>
    );
};
