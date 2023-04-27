import * as THREE from 'three'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useMemo, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, Text3D, useGLTF } from '@react-three/drei'
import { LowPolyWorld } from './LowPolyWorld'

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: 'green', metalness: 0, roughness: 0 })
const floor2Material = new THREE.MeshStandardMaterial({ color: '#222222', metalness: 0, roughness: 0 })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000', metalness: 0, roughness: 1 })
// const wallMaterial = new THREE.MeshStandardMaterial({ color: '#887777', metalness: 0, roughness: 0 })

export function FloatingName({ position = [ 0, 0, 0 ] })
{
    return <group position={ position }>
        <Float floatIntensity={ 0.25 } rotationIntensity={ 0.25 }>
            {/* <Text
                font="/bebas-neue-v9-latin-regular.woff"
                scale={ 0.5 }
                maxWidth={ 0.25 }
                lineHeight={ 0.75 }
                textAlign="left"
                position={ [ 1.5, 0.65, -3 ] }
                rotation-y={ - 0.25 }
            >
                P1E World
                <meshBasicMaterial toneMapped={ false } />
            </Text> */}

            <Text3D 
                font={"./Neue_Regular.json"}
                position={ [ 0, 0.65, -3.4 ] }
                rotation-y={-0.3}
                scale={0.3}
                lineHeight={ 0.8 }
                textAlign="left"
                castShadow
            >
                {`P1E\nWorld`}
                <meshStandardMaterial color={'purple'} />
            </Text3D>
        </Float>
        {/* <mesh geometry={ boxGeometry } material={ floor1Material } position={ position } scale={[ 80.12, 0.2, 80.6 ]} receiveShadow /> */}
    </group>
}

function Bounds()
{
    return <>
        <RigidBody type="fixed" restitution={ 0.2 } friction={ 0 }>
            <CuboidCollider
                type="fixed"
                args={[ 40, 0.2, 40 ]}
                position={[0, 0, 0]}
                restitution={ 0.2}
                friction={ 1 }
            />
        </RigidBody>
    </>
}

export function World(){

    
    return <>
        <FloatingName position={ [ 0, 0, 0 ] } />
        {/* <Bounds /> */}

<RigidBody type='fixed' colliders='hull' restitution={ 0.2 } friction={ 0 }>
    <LowPolyWorld scale={2} position={[0, -10, 0]} />
</RigidBody>
    </>
}