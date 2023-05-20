import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    const user = {
        username: 'Test User',
        piAddress: '0x7326689326798236963',
        totalPi: 200,
        currentAvatar: 'Zaza',

    }

    // login with pi network and check users table of firebase auth
    const login = () => {
        setCurrentUser(user);
    }

    const logout = () => {
        setCurrentUser(null);
    }

    const value = {
        currentUser,
        login,
        logout,
        user,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const AuthContext = () => {
    return useContext(Context);
}