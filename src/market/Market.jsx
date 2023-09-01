// React
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Context/State
import { PlayerContext } from '../context/playerContext';

// Components
import ItemModel from "./components/ItemModel";
import BuildingModel from "./components/BuildingModel";

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
import { BuildingData } from "./data/BuildingData";
import { AvatarData } from "./data/AvatarData";

// lib/firebase
import { addAvatar } from "../api/users";

export default function Market() {
    const navigate = useNavigate();
    const { currentUser, login, logout } = PlayerContext();

    // Auth
    const [page, setPage] = useState('');

    useEffect(() => {
        if (currentUser) {
            setPage(page || 'Market')
        }
    }, [currentUser])



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


    // BUY ITEMS MODAL
    const [buyAvatarModal, setBuyAvatarModal] = useState(null);
    const [buyBuildingModal, setBuyBuildingModal] = useState(null);

    const [buyBtnState, setBuyBtnState] = useState('Buy Now');

    const buyAvatar = async (avatarId, cost, posterWallet) => {
        console.log(avatarId, cost, posterWallet);
        setBuyBtnState('Buying');
        const validPayment = await transact(cost, `Buying Avatar #${avatarId}`, { productId: `${avatarId}` });
        if (!validPayment) return;
        await addAvatar(currentUser, avatarId);
        await getAvatars();
        setBuyBtnState('Bought');
    }

    const buyBuilding = async (buildingId, cost, posterWallet) => {
        console.log(buildingId, cost, posterWallet)
    }


    // Pi SDK Transact function call
    const onReadyForServerApproval = (paymentId) => console.log("onReadyForServerApproval", paymentId);
    const onReadyForServerCompletion = (paymentId, txid) => console.log("onReadyForServerCompletion", paymentId, txid);
    const onCancel = (paymentId) => console.log("onCancel", paymentId);
    const onError = (error, payment) => {
        console.log("onError", error);
        if (payment) {
            console.log(payment);
        }
    }
    const transact = async (amount, memo, paymentMetadata) => {
        //const memo = '';
        //const paymentMetadata = {productId: ''};
        const paymentData = { amount, memo, paymentMetadata };
        const callbacks = {
            onReadyForServerApproval,
            onReadyForServerCompletion,
            onCancel,
            onError
        };
        const payment = await window.Pi.createPayment(paymentData, callbacks);
        console.log(payment);
        return true;
    }

    // buildings loader
    const { nodes, materials } = useGLTF("/lowpoly_world.glb");

    // if(page === 'Loading') return <div style={{ display: 'flex', justifyContent: 'center', height: '50dvh', width: '100%', alignItems: 'center' }}><div className="lds-dual-ring"></div></div>;

    return (
        <div style={{ backgroundColor: 'gray', width: '100%', height: '100dvh', position: 'absolute', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="btn" onClick={() => navigate(-1)}>back to game</div>
                {currentUser ? <div className="btn-gold">{`${currentUser.totalPi}𝜋`}</div> : <></>}
            </div>
            <div style={{ textAlign: 'center', fontSize: '50px' }}>{page}</div>


            {!currentUser ? (
                <>
                    {/* Login Page */}
                    <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="btn" onClick={() => login()}>Login</div>
                    </div>
                </>
            ) : (
                <>
                    <div className="market-nav">
                        <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'Market' ? 'underline' : 'none'}` }} onClick={() => setPage('Market')}>Market</div>
                        <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'My Collection' ? 'underline' : 'none'}` }} onClick={() => setPage('My Collection')}>My Collection</div>
                    </div>
                    {page === 'Market' ? (
                        <>
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', height: '50dvh', width: '100%', alignItems: 'center' }}><div class="lds-dual-ring"></div></div>
                            ) : (
                                <>
                                    {/* BUY MODAL ============================================================================================================================================= */}
                                    {buyAvatarModal ? (
                                        <div onClick={() => setBuyAvatarModal(null)} style={{ position: 'absolute', top: 0, width: '100%', height: '100dvh', backgroundColor: '#00000099' }}>
                                            <div onClick={e => e.stopPropagation()} style={{ margin: '20px', marginTop: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <div className="market-item open" style={{ width: '50%' }}>
                                                    <div style={{ width: '100%', textAlign: 'start', fontSize: '15px', color: '#702963' }}>
                                                        {buyAvatarModal.type}
                                                    </div>
                                                    <ItemModel glb={buyAvatarModal.filepath} scale={buyAvatarModal.modelScale} />
                                                    <div style={{}}>
                                                        {buyAvatarModal.name}
                                                    </div>
                                                    <div style={{ fontSize: '18px' }}>
                                                        <span style={{ color: `${buyAvatarModal.rarity === "Rare" ? 'gold' : 'green'}` }}>{buyAvatarModal.rarity}</span> - {`${buyAvatarModal.cost}𝜋`}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', margin: '20px', justifyContent: 'center', alignItems: 'center' }}>
                                                    <div style={{ fontSize: 'x-large' }}>Cost: {buyAvatarModal.cost}</div>
                                                    <div className="btn-gold" onClick={() => buyAvatar(buyAvatarModal.id, buyAvatarModal.cost, buyAvatarModal.posterWallet)}>{buyBtnState}</div>
                                                </div>
                                            </div>

                                        </div>
                                    ) : buyBuildingModal ? (
                                        <div onClick={() => setBuyBuildingModal(null)} style={{ position: 'absolute', top: 0, width: '100%', height: '100dvh', backgroundColor: '#00000099' }}>
                                            <div onClick={e => e.stopPropagation()} style={{ margin: '20px', marginTop: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <div className="map-item" style={{ width: '50%' }}>
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
                                                    <div className="btn-gold" onClick={() => buyBuilding(buyBuildingModal.id, buyBuildingModal.cost, buyBuildingModal.posterWallet)}>Buy Now</div>
                                                </div>
                                            </div>

                                        </div>
                                    ) : (<>

                                        {/* MARKET ITEMS ============================================================================================================================================= */}

                                        <div style={{ display: 'flex', padding: '5px', overflowY: 'scroll', maxHeight: '75vh', flexWrap: 'wrap', justifyContent: 'center' }}>

                                            {avatars?.map(avatar => currentUser?.avatars.length > 0 ? currentUser?.avatars.map(ownedAvatar => ownedAvatar.id === avatar.id ? <></> : (
                                                <div className="market-item" key={avatar.id} onClick={() => setBuyAvatarModal(avatar)}>
                                                    <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#702963' }}>
                                                        {avatar.type}
                                                    </div>
                                                    <ItemModel glb={avatar.filepath} scale={avatar.modelScale} />
                                                    <div style={{ fontSize: '15px' }}>
                                                        {avatar.name}
                                                    </div>
                                                    <div style={{ fontSize: '12px' }}>
                                                        <span style={{ color: `${avatar.rarity === "Rare" ? 'gold' : 'green'}` }}>{avatar.rarity}</span> - {`${avatar.cost}𝜋`}
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="market-item" key={avatar.id} onClick={() => setBuyAvatarModal(avatar)}>
                                                    <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#702963' }}>
                                                        {avatar.type}
                                                    </div>
                                                    <ItemModel glb={avatar.filepath} scale={avatar.modelScale} />
                                                    <div style={{ fontSize: '15px' }}>
                                                        {avatar.name}
                                                    </div>
                                                    <div style={{ fontSize: '12px' }}>
                                                        <span style={{ color: `${avatar.rarity === "Rare" ? 'gold' : 'green'}` }}>{avatar.rarity}</span> - {`${avatar.cost}𝜋`}
                                                    </div>
                                                </div>
                                            )
                                            )}

                                            {buildings?.map(building => currentUser?.buildings.length > 0 ? currentUser?.buildings.map(ownedBuilding => ownedBuilding.id === building.id ? <></> : (
                                                <div className="map-item" key={building.id} onClick={() => setBuyBuildingModal(building)}>
                                                    <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#E6E6FA' }}>
                                                        {building.type}
                                                    </div>
                                                    <BuildingModel>
                                                        {building.name === "Houses" ? <MarketHouses nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Windmill" ? <MarketWindmill nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Waterwheel" ? <MarketWaterwheel nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Banks" ? <MarketBanks nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Blacksmith" ? <MarketBlacksmith nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Cannon" ? <MarketCannon nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Crossbows" ? <MarketCrossbows nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Mansion" ? <MarketMansion nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Pub" ? <MarketPub nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                    </BuildingModel>
                                                    <div style={{ fontSize: '15px' }}>
                                                        {building.name}
                                                    </div>
                                                    <div style={{ fontSize: '12px' }}>
                                                        <span style={{ color: `${building.rarity === "Rare" ? 'gold' : 'green'}` }}>{building.rarity}</span> - {`${building.cost}𝜋`}
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="map-item" key={building.id} onClick={() => setBuyBuildingModal(building)}>
                                                    <div style={{ width: '100%', textAlign: 'start', fontSize: '12px', color: '#E6E6FA' }}>
                                                        {building.type}
                                                    </div>
                                                    <BuildingModel>
                                                        {building.name === "Houses" ? <MarketHouses nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Windmill" ? <MarketWindmill nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Waterwheel" ? <MarketWaterwheel nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Banks" ? <MarketBanks nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Blacksmith" ? <MarketBlacksmith nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Cannon" ? <MarketCannon nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Crossbows" ? <MarketCrossbows nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Mansion" ? <MarketMansion nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                        {building.name === "Pub" ? <MarketPub nodes={nodes} materials={materials} scale={3} position={[0, -2, 0]} /> : <></>}
                                                    </BuildingModel>
                                                    <div style={{ fontSize: '15px' }}>
                                                        {building.name}
                                                    </div>
                                                    <div style={{ fontSize: '12px' }}>
                                                        <span style={{ color: `${building.rarity === "Rare" ? 'gold' : 'green'}` }}>{building.rarity}</span> - {`${building.cost}𝜋`}
                                                    </div>
                                                </div>
                                            )
                                            )}
                                        </div>
                                    </>)}
                                </>
                            )}

                        </>
                    ) : <></>}

                    {page === 'My Collection' ? (
                        <MyCollection />
                    ) : <></>}
                </>
            )}


        </div>
    );
}

useGLTF.preload("/lowpoly_world.glb");