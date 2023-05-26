// React
import { createContext, useContext, useEffect, useState } from "react";

// Lib/firestore
import { getUser, updateUserActiveBuildings, updateUserAvatar } from "../lib/users";

const Context = createContext();

export const PlayerProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    // AUTH CONTEXT ====================================================================
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userStr = localStorage.getItem("currentUser");
        const user = JSON.parse(userStr);
        if(user){
            setCurrentUser(user);
        }
    }, []);

    const getUserPiWallet = async () => {
        // const scopes = ['username', 'payments', 'wallet_address'];
        // const authRes = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
        return '0x7326689326798236963'
    }

    // login with pi network and check users table of firestore
    const login =  async () => {
        setLoading(true);
        const piAddress = await getUserPiWallet();
        const user = await getUser(piAddress);
        if(!user) return;
        if(user.error){
            console.log(user.error);
        }else{
            const userStr = JSON.stringify(user);
            localStorage.setItem("currentUser", userStr);
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
    const [avatar, setAvatar] = useState({glb: 'pie.glb', gameScale: 0.04, marketScale: 0.65 });

    const updateAvatar = async (newAvatar) => {
        if(!currentUser) return;
        if(!currentUser.piAddress) return;

        await updateUserAvatar(currentUser.piAddress, newAvatar)
        setAvatar(newAvatar)
    }

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

    const updateActiveBuildings = async (newActiveBuildings) => {
        if(!currentUser) return;
        if(!currentUser.piAddress) return;

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