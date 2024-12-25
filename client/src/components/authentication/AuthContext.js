import React, { useState } from "react";
import { createContext } from "react";

// Context 
export const AuthContext = createContext();

// Provider

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const login = (userData, authToken) => {
        setUser({...userData, ['authToken']:authToken});
    };

    const logout = () => {
        setUser({});
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


