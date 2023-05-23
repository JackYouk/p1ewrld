// React
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// R3F/Three
import { useGLTF } from "@react-three/drei";

// Context/State
import { PlayerContext } from '../context/playerContext';

// Components
import ItemModel from "./ItemModel";
import BuildingModel from "./BuildingModel";

// Models
import { 
    MarketBanks, MarketHouses, MarketBlacksmith, 
    MarketCannon, MarketCrossbows, MarketMansion, 
    MarketPub, MarketWaterwheel, MarketWindmill,
} from "../p1e-world/world-assets/buildings";


export default function MyCollection() {
    const navigate = useNavigate();
    const { currentUser, login, logout, avatar, setAvatar, activeBuildings, setActiveBuildings } = PlayerContext();

    const myAvatars = [
        {
            id: 1,
            name: 'Rare P1E',
            rarity: 'Rare',
            cost: 10,
            glb: './rare_pie.glb',
            scale: 1.7,
        },
    ]

    const { nodes, materials } = useGLTF("/lowpoly_world.glb");
    // const { banks, blacksmith, cannon, crossbows, houses, mansion, pub, waterwheel, windmill, } = activeBuildings;
    const myBuildings = [

    ]


    if(!currentUser) return <></>;

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
                    <div style={{ width: '100%', textAlign: 'start', fontSize: '20px', color: '#702963' }}>
                        Avatar
                    </div>
                    <ItemModel glb={'./pie.glb'} scale={0.65} />
                    <div style={{}}>
                        Default P1E
                    </div>
                    <div style={{ fontSize: '18px' }}>
                        <span style={{ color: 'green' }}>Common</span> - Default
                    </div>
                </div>
                {myAvatars.map(item => {
                    return (
                        <div key={item.id} className="market-item" onClick={() => setAvatar({ glb: 'rare_pie.glb', gameScale: 0.08, marketScale: 1.7 })}>
                            <div style={{ width: '100%', textAlign: 'start', fontSize: '20px', color: '#702963' }}>
                                Avatar
                            </div>
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
                <div className="map-item" onClick={() => setActiveBuildings({ ...activeBuildings, houses: !activeBuildings.houses })}>
                    <div style={{ width: '100%', textAlign: 'start', fontSize: '20px', color: '#E6E6FA' }}>
                        Building <span style={{color: `${activeBuildings.houses ? 'lightgreen' : 'orange'}`}}>{activeBuildings.houses ? ' - Active' : ' - Not Active'}</span>
                    </div>
                    <BuildingModel>
                        <MarketHouses nodes={nodes} materials={materials} scale={5} position={[0, -2, 0]} />
                    </BuildingModel>
                    <div style={{}}>
                        Houses
                    </div>
                    <div style={{ fontSize: '18px' }}>
                        <span style={{ color: 'green' }}>Common</span> - Default
                    </div>
                </div>
            </div >
        </>
    )
}