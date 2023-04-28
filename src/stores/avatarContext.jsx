import { createContext, useContext, useEffect, useState } from "react";


const Context = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState({glb: 'pie.glb', gameScale: 0.04, marketScale: 0.65 });

    const value = {
        avatar,
        setAvatar
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const AvatarContext = () => {
    return useContext(Context);
}