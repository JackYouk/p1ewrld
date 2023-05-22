import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const ControlsProvider = ({ children }) => {
    
    const [cameraZoom, setCameraZoom] = useState(0.65);

    const [controls, setControls] = useState(
        {
            forward: false, 
            backward: false, 
            leftward: false, 
            rightward: false, 
            jump: false,
        }
    );

    const value = {
        controls,
        setControls,
        cameraZoom,
        setCameraZoom,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const ControlsContext = () => {
    return useContext(Context);
}