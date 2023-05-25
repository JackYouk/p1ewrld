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
import { getUserAvatars } from "../lib/users";


export default function MyCollection() {
    const navigate = useNavigate();
    const { currentUser, login, logout, avatar, updateAvatar, activeBuildings, updateActiveBuildings } = PlayerContext();
    const [loading, setLoading] = useState(false);

    const [myAvatars, setMyAvatars] = useState([]);

    const getAvatars = async () => {
        if(!currentUser) return;
        setLoading(true);
        const piAddress = currentUser.piAddress;
        const avatars = await getUserAvatars(piAddress);
        console.log(avatars);
        setLoading(false);
        setMyAvatars(avatars)
    }

    useEffect(() => {
        getAvatars();
    }, [])

    const { nodes, materials } = useGLTF("/lowpoly_world.glb");
    // const { banks, blacksmith, cannon, crossbows, houses, mansion, pub, waterwheel, windmill, } = activeBuildings;
    const myBuildings = [

    ]


    if(loading || !currentUser) return <div style={{display: 'flex', justifyContent: 'center', height: '50dvh', width: '100%', alignItems: 'center'}}><div class="lds-dual-ring"></div></div>;

    return (
        <>
            <div style={{ display: 'flex', padding: '5px', flexWrap: 'wrap', overflowY: 'scroll', justifyContent: 'center', maxHeight: '75dvh' }}>
                
                <div className="active-item">
                    <ItemModel glb={avatar.glb} scale={avatar.marketScale} />
                    <div style={{fontSize: '15px'}}>
                        Active P1E
                    </div>
                </div>

                <div className="market-item" onClick={() => updateAvatar({ glb: 'pie.glb', gameScale: 0.04, marketScale: 0.65 })}>
                    <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#702963' }}>
                        Avatar
                    </div>
                    <ItemModel glb={'./pie.glb'} scale={0.65} />
                    <div style={{fontSize: '15px'}}>
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
                            <div style={{fontSize: '15px'}}>
                                {myAvatar.name}
                            </div>
                            <div style={{ fontSize: '12px' }}>
                                <span style={{ color: 'gold' }}>{myAvatar.rarity}</span> {`${myAvatar.cost ? ' - ' + myAvatar.cost + '𝜋' : ''}`}
                            </div>
                        </div >
                    );
                }) : <></>}

                <div className="map-item" onClick={() => updateActiveBuildings({ ...activeBuildings, houses: !activeBuildings.houses })}>
                    <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#E6E6FA' }}>
                        Building <span style={{color: `${activeBuildings.houses ? 'lightgreen' : 'orange'}`}}>{activeBuildings.houses ? ' - Active' : ' - Not Active'}</span>
                    </div>
                    <BuildingModel>
                        <MarketHouses nodes={nodes} materials={materials} scale={5} position={[0, -2, 0]} />
                    </BuildingModel>
                    <div style={{fontSize: '15px'}}>
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