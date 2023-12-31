// React
import { useMemo, useState, useRef } from 'react'

// R3F/Three
import { RigidBody } from '@react-three/rapier'
import { useGLTF } from '@react-three/drei';

// World Assets
import FloatingName from './world-assets/FloatingName'
import HexagonFloor from './world-assets/map/HexagonFloor';
import Terrain from './world-assets/map/Terrain';
import Stairs from './world-assets/map/Stairs';
import Bridge from './world-assets/map/Bridge';
import Trees from './world-assets/map/Trees';
import Bushes from './world-assets/map/Bushes';
import { 
    WorldBanks, WorldBlacksmith, WorldCannon, 
    WorldCrossbows, WorldHouses, WorldMansion, 
    WorldPub, WorldWaterwheel, WorldWindmill, 
} from './world-assets/buildings';

// Context/State
import { PlayerContext } from '../context/playerContext';


export default function World() {
    /*
        LOW POLY WORLD CREDITS
        Auto-generated by: https://github.com/pmndrs/gltfjsx
        author: LowPolyBoy (https://sketchfab.com/lowPolyBoy)
        license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
        source: https://sketchfab.com/3d-models/free-low-poly-game-assets-bbbfbeccfc9047b8b3f15b1c90061cdf
        title: (FREE) Low Poly Game Assets
    */

    const {activeBuildings, setActiveBuilding} = PlayerContext();
    const { banks, blacksmith, cannon, crossbows, houses, mansion, pub, waterwheel, windmill, } = activeBuildings;

    const { nodes, materials, animations } = useGLTF("/lowpoly_world.glb");

    return (
        <>
            <RigidBody type='fixed' colliders='hull' restitution={0.2} friction={0}>
                <group scale={2} position={[0, -10, 0]}>
                    {/* Map */}
                    <HexagonFloor nodes={nodes} materials={materials} />
                    <Terrain nodes={nodes} materials={materials} />
                    <Stairs nodes={nodes} materials={materials} />
                    <Bridge nodes={nodes} materials={materials} />
                    <Trees nodes={nodes} materials={materials} />
                    <Bushes nodes={nodes} materials={materials} />
                    <FloatingName scale={0.5} position={[0.02, 5, 0]} />

                    {/* Buildings */}
                    {banks ? <WorldBanks nodes={nodes} materials={materials} /> : <></>}
                    {blacksmith ? <WorldBlacksmith nodes={nodes} materials={materials} /> : <></>}
                    {cannon ? <WorldCannon nodes={nodes} materials={materials} /> : <></>}
                    {crossbows ? <WorldCrossbows nodes={nodes} materials={materials} /> : <></>}
                    {houses ? <WorldHouses nodes={nodes} materials={materials} /> : <></>}
                    {mansion ? <WorldMansion nodes={nodes} materials={materials} /> : <></>}
                    {pub ? <WorldPub nodes={nodes} materials={materials} /> : <></>}
                    {waterwheel ? <WorldWaterwheel nodes={nodes} materials={materials} /> : <></>}
                    {windmill ? <WorldWindmill nodes={nodes} materials={materials} /> : <></>}

                </group>
            </RigidBody>
        </>
    )
}