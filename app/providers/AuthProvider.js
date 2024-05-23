'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';


export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
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

    if (isLoading) {
        return <p>En attente de données ...</p>;
    }

    return (
        <AuthContext.Provider value={{ user, isAdmin, userLogged }}>
            {children}
        </AuthContext.Provider>
    );
};
