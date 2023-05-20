// React
import { useMemo, useState, useRef } from 'react'

// World Model
import { LowPolyWorld } from './LowPolyWorld'

// R3F/Three
import * as THREE from 'three'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { Float, Text, Text3D, useGLTF } from '@react-three/drei'
THREE.ColorManagement.legacyMode = false


export function FloatingName({ position = [0, 0, 0] }) {
    return (
        <group position={position}>
            <Float floatIntensity={0.25} rotationIntensity={0.25}>
                <Text3D
                    font={"./Neue_Regular.json"}
                    position={[0, 0.65, -3.4]}
                    rotation-y={-0.3}
                    scale={0.3}
                    lineHeight={0.8}
                    textAlign="left"
                    castShadow
                >
                    {`P1E\nWorld`}
                    <meshStandardMaterial color={'purple'} />
                </Text3D>
            </Float>
        </group>
    );
}


export default function World() {
    return (
        <>
            <FloatingName position={[0, 0, 0]} />

            <RigidBody type='fixed' colliders='hull' restitution={0.2} friction={0}>
                <LowPolyWorld scale={2} position={[0, -10, 0]} />
            </RigidBody>
        </>
    )
}