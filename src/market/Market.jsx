// React
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Context/State
import { PlayerContext } from '../context/playerContext';

// Components
import ItemModel from "./ItemModel";
import BuildingModel from "./BuildingModel";

// Market Pages
import MyCollection from "./MyCollection";

// R3F/Three
import { useGLTF } from "@react-three/drei";

// Models
import {
    MarketBanks, MarketHouses, MarketBlacksmith,
    MarketCannon, MarketCrossbows, MarketMansion,
    MarketPub, MarketWaterwheel, MarketWindmill,
} from "../p1e-world/world-assets/buildings";

// HardCoded Data
import { BuildingData } from "./BuildingData";
import { AvatarData } from "./AvatarData";

export default function Market() {
    const navigate = useNavigate();
    const { currentUser, login, logout } = PlayerContext();

    // Auth
    const [page, setPage] = useState('Login');

    useEffect(() => {
        if (currentUser) {
            setPage('Market');
        }
        if (!currentUser) {
            setPage('Login')
        }
    }, [currentUser]);


    // GET ITEMS
    const [loading, setLoading] = useState(false);

    const [avatars, setAvatars] = useState([]);
    const getAvatars = async () => {
        setLoading(true);
        setAvatars(AvatarData);
        setLoading(false);
    }

    const [buildings, setBuildings] = useState([]);
    const getBuildings = async () => {
        setLoading(true);
        setBuildings(BuildingData);
        setLoading(false);
    }

    useEffect(() => {
        getAvatars();
        getBuildings();
    }, []);


    // BUY ITEMS
    const [buyAvatarModal, setBuyAvatarModal] = useState(null);

    const buyAvatar = (avatar) => {
        setBuyAvatarModal(avatar);
        return;
    }

    const [buyBuildingModal, setBuyBuildingModal] = useState(null);

    const buyBuilding = (building) => {
        setBuyBuildingModal(building);
        return;
    }


    // Pi SDK Transact function call
    const transact = async () => {

    }

    // buildings loader
    const { nodes, materials } = useGLTF("/lowpoly_world.glb");

    return (
        <div style={{ backgroundColor: 'gray', width: '100%', height: '100dvh', position: 'absolute', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="btn" onClick={() => navigate(-1)}>back to game</div>
                {currentUser ? <div className="btn-gold">{`${currentUser.totalPi}𝜋`}</div> : <></>}
            </div>
            <div style={{ textAlign: 'center', fontSize: '50px' }}>{page}</div>


            {page === 'Login' ? (
                <>
                    {/* Login Page */}
                    <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="btn" onClick={() => login()}>Login</div>
                    </div>
                </>
            ) : (
                // Market Nav if logged in
                <div className="market-nav">
                    <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'Market' ? 'underline' : 'none'}` }} onClick={() => setPage('Market')}>Market</div>
                    <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'My Collection' ? 'underline' : 'none'}` }} onClick={() => setPage('My Collection')}>My Collection</div>
                </div>
            )}

            {page === 'Market' && !loading ? (
                <>
                    {/* BUY MODAL ============================================================================================================================================= */}
                    {buyAvatarModal ? (
                        <div onClick={() => setBuyAvatarModal(null)} style={{ position: 'absolute', top: 0, width: '100%', height: '100dvh', backgroundColor: '#00000099' }}>
                            <div onClick={e => e.stopPropagation()} style={{ margin: '20px', marginTop: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="market-item open" style={{width: '50%'}}>
                                    <div style={{ width: '100%', textAlign: 'start', fontSize: '15px', color: '#702963' }}>
                                        {buyAvatarModal.type}
                                    </div>
                                    <ItemModel glb={buyAvatarModal.filepath} scale={buyAvatarModal.modelScale} />
                                    <div style={{}}>
                                        {buyAvatarModal.name}
                                    </div>
                                    <div style={{ fontSize: '18px' }}>
                                        <span style={{ color: `${buyBuildingModal.rarity === "Rare" ? 'gold' : 'green'}` }}>{buyAvatarModal.rarity}</span> - {`${buyAvatarModal.cost}𝜋`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', margin: '20px', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ fontSize: 'x-large' }}>Cost: {buyAvatarModal.cost}</div>
                                    <div className="btn-gold" onClick={() => transact(buyAvatarModal.id, buyAvatarModal.cost, buyAvatarModal.posterWallet)}>Buy Now</div>
                                </div>
                            </div>

                        </div>
                    ) : buyBuildingModal ? (
                        <div onClick={() => setBuyBuildingModal(null)} style={{ position: 'absolute', top: 0, width: '100%', height: '100dvh', backgroundColor: '#00000099' }}>
                            <div onClick={e => e.stopPropagation()} style={{ margin: '20px', marginTop: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="map-item" style={{width: '50%'}}>
                                    <div style={{ width: '100%', textAlign: 'start', fontSize: '15px', color: '#E6E6FA' }}>
                                        {buyBuildingModal.type}
                                    </div>
                                    <BuildingModel>
                                        {buyBuildingModal.name === "Banks" ? <MarketBanks nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                        {buyBuildingModal.name === "Blacksmith" ? <MarketBlacksmith nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                        {buyBuildingModal.name === "Cannon" ? <MarketCannon nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                        {buyBuildingModal.name === "Crossbows" ? <MarketCrossbows nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                        {buyBuildingModal.name === "Mansion" ? <MarketMansion nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                        {buyBuildingModal.name === "Pub" ? <MarketPub nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                    </BuildingModel>
                                    <div style={{}}>
                                        {buyBuildingModal.name}
                                    </div>
                                    <div style={{ fontSize: '18px' }}>
                                        <span style={{ color: `${buyBuildingModal.rarity === "Rare" ? 'gold' : 'green'}` }}>{buyBuildingModal.rarity}</span> - {`${buyBuildingModal.cost}𝜋`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', margin: '20px', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ fontSize: 'x-large' }}>Cost: {buyBuildingModal.cost}</div>
                                    <div className="btn-gold" onClick={() => transact(buyBuildingModal.id, buyBuildingModal.cost, buyBuildingModal.posterWallet)}>Buy Now</div>
                                </div>
                            </div>

                        </div>
                    ) : (<>

                        {/* MARKET ITEMS ============================================================================================================================================= */}

                        <div style={{ display: 'flex',  padding: '5px', overflowY: 'scroll', maxHeight: '75vh', flexWrap: 'wrap', justifyContent: 'center' }}>

                            {avatars?.map(avatar => {
                                return (
                                    <div className="market-item" key={avatar.id} onClick={() => buyAvatar(avatar)}>
                                        <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#702963' }}>
                                            {avatar.type}
                                        </div>
                                        <ItemModel glb={avatar.filepath} scale={avatar.modelScale} />
                                        <div style={{fontSize: '15px'}}>
                                            {avatar.name}
                                        </div>
                                        <div style={{ fontSize: '12px' }}>
                                            <span style={{ color: `${avatar.rarity === "Rare" ? 'gold' : 'green'}` }}>{avatar.rarity}</span> - {`${avatar.cost}𝜋`}
                                        </div>
                                    </div>
                                )
                            })}

                            {buildings?.map(building => {
                                return (
                                    <div className="map-item" key={building.id} onClick={() => buyBuilding(building)}>
                                        <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#E6E6FA' }}>
                                            {building.type}
                                        </div>
                                        <BuildingModel>
                                            {building.name === "Banks" ? <MarketBanks nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                            {building.name === "Blacksmith" ? <MarketBlacksmith nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                            {building.name === "Cannon" ? <MarketCannon nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                            {building.name === "Crossbows" ? <MarketCrossbows nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                            {building.name === "Mansion" ? <MarketMansion nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                            {building.name === "Pub" ? <MarketPub nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                        </BuildingModel>
                                        <div style={{fontSize: '15px'}}>
                                            {building.name}
                                        </div>
                                        <div style={{ fontSize: '12px' }}>
                                            <span style={{ color: `${building.rarity === "Rare" ? 'gold' : 'green'}` }}>{building.rarity}</span> - {`${building.cost}𝜋`}
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </>)}
                </>
            ) : <></>}

            {page === 'My Collection' ? (
                <MyCollection />
            ) : <></>}
        </div>
    );
}

useGLTF.preload("/lowpoly_world.glb");