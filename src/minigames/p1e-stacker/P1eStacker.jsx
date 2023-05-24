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

export default function P1eStacker() {
    const [hitSound] = useState(() => new Audio('./hit.mp3'));

    let COUNT = 1;


    const handleCollision = () => {
        hitSound.currentTime = 0;
        hitSound.volume = Math.random()
        hitSound.play();
    }

    return (
        <>
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
                    <Physics gravity={[0, -1, 0]}>
                        <Debug />
                        <Lights />

                        <Player
                            colliders={'cuboid'}
                            position={[0, 0.5, 0]}
                            angularDamping={0}
                            linearDamping={0}
                            restitution={0}
                            friction={5}
                        />

                        <RigidBody
                            colliders={'cuboid'}
                            position={[0, 1.5, 0]}
                            linearDamping={0}
                            angularDamping={0}
                            restitution={0}
                            friction={1}
                            onCollisionEnter={handleCollision()}
                        >
                            <Gltf src='rare_pie.glb' castShadow scale={0.08} />
                        </RigidBody>

                        {/* <InstancedRigidBodies
                            instances={instances}
                            colliders="cuboid"
                        >
                            <instancedMesh position={[0, 1, 0]} args={[undefined, undefined, COUNT]} count={COUNT} >
                                <boxGeometry args={[1, 1, 1]} />
                                <meshBasicMaterial color='blue' />
                            </instancedMesh>
                        </InstancedRigidBodies> */}


                        {/* Floor */}
                        <RigidBody colliders='hull' type='fixed' restitution={0} friction={0} position={[0, 0, 0]}>
                            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                                <boxGeometry args={[10, 10, 1]} />
                                <meshStandardMaterial color='white' />
                            </mesh>
                        </RigidBody>
                    </Physics>
                </Suspense>
            </Canvas>
            <Interface />
        </>
    )
}