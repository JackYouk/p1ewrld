// React
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Context/State
import { PlayerContext } from '../context/playerContext';

// Components
import ItemModel from "./ItemModel";

export default function MyCollection() {
    const navigate = useNavigate();
    const { currentUser, login, logout, avatar, setAvatar } = PlayerContext();

    const myCollection = [
        {
            id: 1,
            name: 'Rare P1E',
            rarity: 'Rare',
            cost: 10,
            glb: './rare_pie.glb',
            scale: 1.7,
        },
    ]

    return (
        <>
            <div style={{ display: 'flex', padding: '5px', flexDirection: `${window.innerWidth < 600 ? 'column' : 'row'}`, overflowY: 'scroll', maxHeight: '75dvh' }}>
                <div className="active-item">
                    <ItemModel glb={avatar.glb} scale={avatar.marketScale} />
                    <div style={{}}>
                        Active P1E
                    </div>
                </div>
                <div className="market-item" onClick={() => setAvatar({ glb: 'pie.glb', gameScale: 0.04, marketScale: 0.65 })}>
                    <ItemModel glb={'./pie.glb'} scale={0.65} />
                    <div style={{}}>
                        Default P1E
                    </div>
                    <div style={{ fontSize: '18px' }}>
                        <span style={{ color: 'green' }}>Common</span> - Default
                    </div>
                </div>
                {myCollection.map(item => {
                    return(
                        <div className="market-item" onClick={() => setAvatar({ glb: 'rare_pie.glb', gameScale: 0.08, marketScale: 1.7 })}>
                        <ItemModel glb={item.glb} scale={item.scale} />
                        <div style={{}}>
                            {item.name}
                        </div>
                        <div style={{ fontSize: '18px' }}>
                            <span style={{ color: 'gold' }}>{item.rarity}</span> {`${item.cost ? ' - ' + item.cost + '𝜋' : ''}`}
                        </div>
                    </div >
                    );
                })}
               
            </div >
        </>
    )
}