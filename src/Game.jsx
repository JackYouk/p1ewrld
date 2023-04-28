import { Canvas } from '@react-three/fiber'
import Experience from './game/Experience.jsx'
import { Loader } from '@react-three/drei'
import { Suspense } from 'react'
import Interface from './game/Interface.jsx'


export default function Game() {
    return(
        <>
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 2.5, 10, 6 ]
            } }
        >
            <Suspense fallback='null'>
                <Experience />
            </Suspense>
        </Canvas>
        <Loader />
        <Interface />
        </>
    )
}