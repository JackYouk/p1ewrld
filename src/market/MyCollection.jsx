// React
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// R3F/Three
import { useGLTF } from "@react-three/drei";

// Context/State
import { PlayerContext } from '../context/playerContext';

// Components
import ItemModel from "./components/ItemModel";
import BuildingModel from "./components/BuildingModel";

// Models
import {
    MarketBanks, MarketHouses, MarketBlacksmith,
    MarketCannon, MarketCrossbows, MarketMansion,
    MarketPub, MarketWaterwheel, MarketWindmill,
} from "../p1e-world/world-assets/buildings";

// Lib/Firebase
import { getUserAvatars, getUserBuildings } from "../api/users";


export default function MyCollection() {
    const navigate = useNavigate();
    const { currentUser, login, logout, avatar, updateAvatar, activeBuildings, updateActiveBuildings } = PlayerContext();
    const [loading, setLoading] = useState(false);

    const [myAvatars, setMyAvatars] = useState([]);

    const getAvatars = async () => {
        if (!currentUser) return;
        const piAddress = currentUser.piAddress;
        const avatars = await getUserAvatars(piAddress);
        setMyAvatars(avatars)
    }

    const [myBuildings, setMyBuildings] = useState([]);

    const getBuildings = async () => {
        if (!currentUser) return;
        const piAddress = currentUser.piAddress;
        const buildings = await getUserBuildings(piAddress);
        setMyBuildings(buildings)
    }

    const getItems = async () => {
        if (!currentUser) return;
        setLoading(true);
        await getAvatars();
        await getBuildings();
        setLoading(false);
    }

    useEffect(() => {
        getItems();
    }, [])

    const { nodes, materials } = useGLTF("/lowpoly_world.glb");


    if (loading || !currentUser) return <div style={{ display: 'flex', justifyContent: 'center', height: '50dvh', width: '100%', alignItems: 'center' }}><div className="lds-dual-ring"></div></div>;

    return (
        <>
            <div style={{ display: 'flex', padding: '5px', flexWrap: 'wrap', overflowY: 'scroll', justifyContent: 'center', maxHeight: '75dvh' }}>

                <div className="active-item">
                    <ItemModel glb={avatar.glb} scale={avatar.marketScale} />
                    <div style={{ fontSize: '15px' }}>
                        Active P1E
                    </div>
                </div>

                <div className="market-item" onClick={() => updateAvatar({ glb: 'pie.glb', gameScale: 0.04, marketScale: 0.65 })}>
                    <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#702963' }}>
                        Avatar
                    </div>
                    <ItemModel glb={'./pie.glb'} scale={0.65} />
                    <div style={{ fontSize: '15px' }}>
                        Default P1E
                    </div>
                    <div style={{ fontSize: '12px' }}>
                        <span style={{ color: 'green' }}>Common</span> - Default
                    </div>
                </div>

                {myAvatars.length > 0 ? myAvatars.map(myAvatar => {
                    return (
                        <div key={myAvatar.id} className="market-item" onClick={() => updateAvatar({ glb: myAvatar.filepath, gameScale: myAvatar.gameScale, marketScale: myAvatar.marketScale })}>
                            <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#702963' }}>
                                Avatar
                            </div>
                            <ItemModel glb={myAvatar.filepath} scale={myAvatar.marketScale} />
                            <div style={{ fontSize: '15px' }}>
                                {myAvatar.name}
                            </div>
                            <div style={{ fontSize: '12px' }}>
                                <span style={{ color: 'gold' }}>{myAvatar.rarity}</span> {`${myAvatar.cost ? ' - ' + myAvatar.cost + '𝜋' : ''}`}
                            </div>
                        </div >
                    );
                }) : <></>}

                {myBuildings.length > 0 ? myBuildings.map(myBuilding => {
                    return (
                        <div className="map-item" key={myBuilding.id} onClick={() => updateActiveBuildings({ ...activeBuildings, [myBuilding.key]: !activeBuildings[myBuilding.key] })}>
                            <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#E6E6FA' }}>
                                Building <span style={{ color: `${activeBuildings[myBuilding.key] ? 'lightgreen' : 'orange'}` }}>{activeBuildings[myBuilding.key] ? ' - Active' : ' - Not Active'}</span>
                            </div>
                            <BuildingModel>
                                {myBuilding.name === "Houses" ? <MarketHouses nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                {myBuilding.name === "Windmill" ? <MarketWindmill nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                {myBuilding.name === "Waterwheel" ? <MarketWaterwheel nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                {myBuilding.name === "Banks" ? <MarketBanks nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                {myBuilding.name === "Blacksmith" ? <MarketBlacksmith nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                {myBuilding.name === "Cannon" ? <MarketCannon nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                {myBuilding.name === "Crossbows" ? <MarketCrossbows nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                {myBuilding.name === "Mansion" ? <MarketMansion nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                {myBuilding.name === "Pub" ? <MarketPub nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                            </BuildingModel>
                            <div style={{ fontSize: '15px' }}>
                                {myBuilding.name}
                            </div>
                            <div style={{ fontSize: '12px' }}>
                                <span style={{ color: 'green' }}>{myBuilding.rarity}</span> {`${myBuilding.cost ? ' - ' + myBuilding.cost + '𝜋' : ''}`}
                            </div>
                        </div>
                    );
                }) : <></>}

                <div className="map-item" onClick={() => updateActiveBuildings({ ...activeBuildings, houses: !activeBuildings.houses })}>
                    <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#E6E6FA' }}>
                        Building <span style={{ color: `${activeBuildings.houses ? 'lightgreen' : 'orange'}` }}>{activeBuildings.houses ? ' - Active' : ' - Not Active'}</span>
                    </div>
                    <BuildingModel>
                        <MarketHouses nodes={nodes} materials={materials} scale={5} position={[0, -2, 0]} />
                    </BuildingModel>
                    <div style={{ fontSize: '15px' }}>
                        Houses
                    </div>
                    <div style={{ fontSize: '12px' }}>
                        <span style={{ color: 'green' }}>Common</span> - Default
                    </div>
                </div>

            </div>
        </>
    )
}

useGLTF.preload("/lowpoly_world.glb");