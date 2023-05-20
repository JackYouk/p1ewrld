// React
import { Suspense } from 'react'

// R3F/Three
import { Canvas } from '@react-three/fiber'
import { Physics, Debug } from '@react-three/rapier'
import { Loader } from '@react-three/drei'

// Open World
import World from './World.jsx'

// Game Components
import Interface from '../game-components/Interface'
import Player from '../game-components/Player.jsx'
import Lights from '../game-components/Lights.jsx'


export default function Game() {
    return (
        <>
            <Canvas
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [2.5, 10, 6]
                }}
            >
                <Suspense fallback='null'>
                    <color args={['#252731']} attach="background" />
                    <Physics gravity={[0, -20, 0]}>
                        {/* <Debug /> */}
                        <Lights />
                        <World />
                        <Player />
                    </Physics>
                </Suspense>
            </Canvas>
            <Loader />
            <Interface />
        </>
    )
}