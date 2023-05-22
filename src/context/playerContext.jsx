import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const PlayerProvider = ({ children }) => {

    // AUTH CONTEXT ====================================================================
    const [currentUser, setCurrentUser] = useState(null);

    const user = {
        uid: '',
        username: 'Test User',
        piAddress: '0x7326689326798236963',
        totalPi: 200,
        currentAvatar: {
            filepath: '',
            name: '',

        },
        collection: [],
    }

    // login with pi network and check users table of firestore
    const login = () => {
        setCurrentUser(user);
    }

    const logout = () => {
        setCurrentUser(null);
    }

    // Avatar Context ====================================================================
    const [avatar, setAvatar] = useState({glb: 'pie.glb', gameScale: 0.04, marketScale: 0.65 });

    // Map Context =======================================================================
    const [activeBuildings, setActiveBuildings] = useState({
        banks: false,
        blacksmith: false,
        cannon: false,
        crossbows: false,
        houses: false,
        mansion: false,
        pub: false,
        waterwheel: false,
        windmill: false,
    });

    const value = {
        // Auth
        currentUser,
        login,
        logout,
        user,

        // Avatar
        avatar,
        setAvatar,

        // Map
        activeBuildings,
        setActiveBuildings
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const PlayerContext = () => {
    return useContext(Context);
}