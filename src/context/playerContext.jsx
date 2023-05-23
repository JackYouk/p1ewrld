// React
import { createContext, useContext, useEffect, useState } from "react";

// Lib/firestore
import { getUser } from "../lib/users";

const Context = createContext();

export const PlayerProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    // AUTH CONTEXT ====================================================================
    const [currentUser, setCurrentUser] = useState(null);

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
            setCurrentUser(user);
        }
        setLoading(false);
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

    useEffect(() => {
        if(!loading && currentUser && currentUser.activeBuildings){
            setActiveBuildings(currentUser.activeBuildings);
        }    
    }, [currentUser])

   
    const value = {
        // Auth
        currentUser,
        login,
        logout,

        // Avatar
        avatar,
        setAvatar,

        // Map
        activeBuildings,
        setActiveBuildings
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