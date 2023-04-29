import { Environment, Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { Gltf } from "@react-three/drei";
import { useRef } from "react";
import { AvatarContext } from "./stores/avatarContext";
import { useState } from "react";


function ItemModel({ glb, scale }) {

    return (
        // <Float>
        <Gltf src={glb} rotation-x={0.5} scale={scale} />
        // </Float>
    )
}

export default function Market() {
    const router = useNavigate();

    const { avatar, setAvatar } = AvatarContext();

    const [page, setPage] = useState('Login')

    const buyAvatar = () => {
        return;
    }

    // set up a pi wallet and a pi app
    // login page with pi network auth
    // auction page - payment goes to P1EWRLD wallet, 10% cut taken, then sent to seller
    // casino page - chose basic ($0.99), rare ($1.99), or ultra ($4.99) machine and spin for new avatar
    // market page - chose avatars from the market ($0.99 - $19.99 based on rarity)


    return (
        <div style={{ backgroundColor: 'gray', width: '100%', height: '100dvh', position: 'absolute', color: 'white' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="btn" onClick={() => router('/')}>back to game</div>
                <div className="btn-gold" onClick={() => setPage('Bank')}>{`${'0'}𝜋`}</div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '50px' }}>{page}</div>

            {page === 'Login' ? <></> : <div className="market-nav">
                <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'Market' ? 'underline' : 'none'}` }} onClick={() => setPage('Market')}>Market</div>
                <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'Casino' ? 'underline' : 'none'}` }} onClick={() => setPage('Casino')}>Casino</div>
                <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'Auction' ? 'underline' : 'none'}` }} onClick={() => setPage('Auction')}>Auction</div>
                <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'Bank' ? 'underline' : 'none'}` }} onClick={() => setPage('Bank')}>Bank</div>
                <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'My Avatars' ? 'underline' : 'none'}` }} onClick={() => setPage('My Avatars')}>My Avatars</div>
            </div>}

            {page === 'Login' ? (
                <>
                    <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="btn" onClick={() => setPage('Market')}>Login</div>
                    </div>
                </>
            ) : <></>}

            {page === 'Market' ? (
                <>
                    <div style={{ display: 'flex', padding: '5px', flexDirection: `${window.innerWidth < 600 ? 'column' : 'row'}`, overflowY: 'scroll', maxHeight: '75dvh' }}>
                        <div className="market-item" onClick={() => buyAvatar()}>
                            <Canvas
                                shadows
                                camera={{
                                    fov: 45,
                                    near: 0.1,
                                    far: 200,
                                    position: [0, 0, 10]
                                }}
                                style={{ height: '175px', width: '175px' }}
                            >
                                <Environment preset="city" />
                                <ItemModel glb={'./pie.glb'} scale={0.65} />
                            </Canvas>
                            <div style={{}}>
                                Default P1E
                            </div>
                            <div style={{ fontSize: '18px' }}>
                                <span style={{ color: 'green' }}>Common</span> - Default
                            </div>
                        </div>
                        <div className="market-item" onClick={() => buyAvatar()}>
                            <Canvas
                                shadows
                                camera={{
                                    fov: 45,
                                    near: 0.1,
                                    far: 200,
                                    position: [0, 0, 10]
                                }}
                                style={{ height: '175px', width: '175px' }}
                            >
                                <Environment preset="city" />
                                <ItemModel glb={'./rare_pie.glb'} scale={1.7} />
                            </Canvas>
                            <div style={{}}>
                                Rare P1E
                            </div>
                            <div style={{ fontSize: '18px' }}>
                                <span style={{ color: 'gold' }}>Rare</span> - {`10𝜋`}
                            </div>
                        </div>
                    </div>
                </>
            ) : <></>}

            {page === 'Casino' ? (
                <></>
            ) : <></>}

            {page === 'Auction' ? (
                <></>
            ) : <></>}

            {page === 'Bank' ? (
                <></>
            ) : <></>}

            {page === 'My Avatars' ? (
                <>
                    <div style={{ display: 'flex', padding: '5px', flexDirection: `${window.innerWidth < 600 ? 'column' : 'row'}`, overflowY: 'scroll', maxHeight: '75dvh' }}>
                        <div className="active-item">
                            <Canvas
                                shadows
                                camera={{
                                    fov: 45,
                                    near: 0.1,
                                    far: 200,
                                    position: [0, 0, 10]
                                }}
                                style={{ height: '175px', width: '175px' }}
                            >
                                <Environment preset="city" />
                                <ItemModel glb={avatar.glb} scale={avatar.marketScale} />
                            </Canvas>
                            <div style={{}}>
                                Active P1E
                            </div>
                        </div>
                        <div className="market-item" onClick={() => setAvatar({ glb: 'pie.glb', gameScale: 0.04, marketScale: 0.65 })}>
                            <Canvas
                                shadows
                                camera={{
                                    fov: 45,
                                    near: 0.1,
                                    far: 200,
                                    position: [0, 0, 10]
                                }}
                                style={{ height: '175px', width: '175px' }}
                            >
                                <Environment preset="city" />
                                <ItemModel glb={'./pie.glb'} scale={0.65} />
                            </Canvas>
                            <div style={{}}>
                                Default P1E
                            </div>
                            <div style={{ fontSize: '18px' }}>
                                <span style={{ color: 'green' }}>Common</span> - Default
                            </div>
                        </div>
                        <div className="market-item" onClick={() => setAvatar({ glb: 'rare_pie.glb', gameScale: 0.08, marketScale: 1.7 })}>
                            <Canvas
                                shadows
                                camera={{
                                    fov: 45,
                                    near: 0.1,
                                    far: 200,
                                    position: [0, 0, 10]
                                }}
                                style={{ height: '175px', width: '175px' }}
                            >
                                <Environment preset="city" />
                                <ItemModel glb={'./rare_pie.glb'} scale={1.7} />
                            </Canvas>
                            <div style={{}}>
                                Rare P1E
                            </div>
                            <div style={{ fontSize: '18px' }}>
                                <span style={{ color: 'gold' }}>Rare</span> - {`10𝜋`}
                            </div>
                        </div>
                    </div>
                </>
            ) : <></>}
        </div>
    );
}