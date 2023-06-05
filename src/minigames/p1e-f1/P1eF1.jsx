// React
import { Suspense, useMemo, useState } from 'react'

// R3F/Three
import { Canvas } from '@react-three/fiber'
import { Physics, Debug, RigidBody, InstancedRigidBodies, } from '@react-three/rapier'
import { Gltf, Loader } from '@react-three/drei'

// Game Components
import Interface from '../../game-components/Interface'
import Lights from '../../game-components/Lights.jsx'
import Player from '../../game-components/Player.jsx'
import { Racetrack } from './RacetrackModel'

export default function P1eF1() {
    const [hitSound] = useState(() => new Audio('./hit.mp3'));

    let COUNT = 1;


    const handleCollision = () => {
        hitSound.currentTime = 0;
        hitSound.volume = Math.random()
        hitSound.play();
    }

    const [hasF1Avatar, setHasF1Avatar] = useState(false);
    const [avatarUnlockedModal, setAvatarUnlockedModal] = useState(false);

    const unlockF1Avatar = () => {
        // add f1 avatar to collection firebase
        setHasF1Avatar(true);
        setAvatarUnlockedModal(true);
    }

    return (
        <>
            {avatarUnlockedModal ? (
                <div onClick={() => setAvatarUnlockedModal(false)} style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', top: 0, left: 0, zIndex: 100, color: 'white', width: '100%', height: '100dvh', backgroundColor: '#ffffff99',}}>
                    <div style={{fontSize: '40px', fontWeight: 'bolder'}}>Avatar Unlocked!</div>
                </div>
            ) : <></>}
            <Canvas
                shadows
                camera={{
                    fov: 45,
                    near: 0.08,
                    far: 200,
                    position: [2.5, 10, 6]
                }}
            >
                <Suspense fallback='null'>
                    <color args={['#252731']} attach="background" />
                    <Physics gravity={[0, -20, 0]}>
                        {/* <Debug /> */}
                        <Lights />

                        <Player
                            colliders={'ball'}
                            position={[-2.5, 1, -30]}
                            // angularDamping={0}
                            // linearDamping={-1}
                            // restitution={0}
                            friction={1}
                            resetPosition={{ x: -2.5, y: 1, z: -30 }}
                            jumpStrength={0.5}
                        />

                        {!hasF1Avatar ? (
                            <RigidBody onCollisionEnter={() => unlockF1Avatar()} colliders='hull' type='fixed' position={[1.8, 5, -2.5]}>
                                <Gltf src='./f1pie.glb' scale={0.2}></Gltf>
                            </RigidBody>
                        ) : <></>}

                        {/* Floor */}
                        <RigidBody colliders='trimesh' type='fixed' restitution={0} friction={0} position={[0, 0, 0]}>
                            {/* <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                                <boxGeometry args={[10, 10, 1]} />
                                <meshStandardMaterial color='white' />
                            </mesh> */}
                            <Racetrack scale={0.1} position={[-9.5, 0, -34.5]} />
                        </RigidBody>
                    </Physics>
                </Suspense>
            </Canvas>
            <Interface />
        </>
    )
}