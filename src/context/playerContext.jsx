// React
import { createContext, useContext, useEffect, useState } from "react";

// Lib/firestore
import { getUser, updateUserActiveBuildings, updateUserAvatar } from "../lib/users";


const Context = createContext();

export const PlayerProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const [activeBuildings, setActiveBuildings] = useState(null);

    const [avatar, setAvatar] = useState(null);


    // AUTH CONTEXT ====================================================================
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const lsUserStr = localStorage.getItem("currentUser");
        const lsUser = JSON.parse(lsUserStr);
        if (lsUser) {
            setCurrentUser(lsUser);
            setAvatar(lsUser.currentAvatar);
            setActiveBuildings(lsUser.activeBuildings);
        } else {
            setActiveBuildings({
                banks: false,
                blacksmith: false,
                cannon: false,
                crossbows: false,
                houses: false,
                mansion: false,
                pub: false,
                waterwheel: false,
                windmill: false,
            })
            setAvatar({ glb: 'pie.glb', gameScale: 0.04, marketScale: 0.65 })
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            localStorage.clear();
            const userStr = JSON.stringify(currentUser);
            localStorage.setItem("currentUser", userStr);
        }
    }, [currentUser]);

    const getUserPiWallet = async () => {
        const scopes = ['username', 'payments', 'wallet_address'];
        const authRes = await window.Pi.authenticate(scopes, () => console.log('incomplete payment found'))
        console.log(authRes);
        return '0x7326689326798236963'
    }

    // login with pi network and check users table of firestore
    const login = async () => {
        setLoading(true);
        const piAddress = await getUserPiWallet();
        const user = await getUser(piAddress);
        if (!user) return;
        if (user.error) {
            console.log(user.error);
        } else {
            // localStorage.clear();
            // const userStr = JSON.stringify(user);
            // localStorage.setItem("currentUser", userStr);
            setCurrentUser(user);
            setAvatar(user.currentAvatar);
            setActiveBuildings(user.activeBuildings);
        }
        setLoading(false);
    }

    const logout = () => {
        localStorage.clear();
        setCurrentUser(null);
    }

    // Avatar Context ====================================================================

    const updateAvatar = async (newAvatar) => {
        if (!currentUser) return;
        if (!currentUser.piAddress) return;
        setCurrentUser({ ...currentUser, currentAvatar: newAvatar })
        await updateUserAvatar(currentUser.piAddress, newAvatar)
        setAvatar(newAvatar)
    }

    // Map Context =======================================================================


    const updateActiveBuildings = async (newActiveBuildings) => {
        if (!currentUser) return;
        if (!currentUser.piAddress) return;
        setCurrentUser({ ...currentUser, activeBuildings: newActiveBuildings })
        await updateUserActiveBuildings(currentUser.piAddress, newActiveBuildings);
        setActiveBuildings(newActiveBuildings);
    }


    const value = {
        // Auth
        currentUser,
        login,
        logout,

        // Avatar
        avatar,
        updateAvatar,

        // Map
        activeBuildings,
        updateActiveBuildings,
    }

    return (
        <Context.Provider value={value}>
            {!loading && children}
        </Context.Provider>
    );
}

export const PlayerContext = () => {
    return useContext(Context);
}