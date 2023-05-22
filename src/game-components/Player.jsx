// React
import { useState, useEffect, useRef } from 'react'

// R3F/Three
import { useRapier, RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { Gltf } from '@react-three/drei'
import * as THREE from 'three'

// Context/State
import { PlayerContext } from '../context/playerContext.jsx'
import { ControlsContext } from '../context/controlsContext.jsx'


export default function Player() {
    const { avatar, setAvatar } = PlayerContext();
    const {cameraZoom, setCameraZoom, controls, setControls} = ControlsContext();
    const body = useRef()
    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()
    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 20, 10))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())

    const jump = () => {
        const origin = body.current.translation()
        origin.y -= 0.31
        const direction = { x: 0, y: - 1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = rapierWorld.castRay(ray, 10, true)

        if (hit.toi < 0.15) {
            body.current.applyImpulse({ x: 0, y: 0.1, z: 0 })
        }
    }

    const reset = () => {
        body.current.setTranslation({ x: 0, y: 1, z: 0 })
        body.current.setLinvel({ x: 0, y: 0, z: 0 })
        body.current.setAngvel({ x: 0, y: 0, z: 0 })
    }


    useFrame((state, delta) => {
        /**
         * Controls
         */
        const { forward, backward, leftward, rightward } = controls

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 4.5 * delta
        // const torqueStrength = 2 * delta

        if (forward) {
            impulse.z -= impulseStrength
            // torque.x -= torqueStrength
            setControls({ ...controls, forward: false })
        }

        if (rightward) {
            impulse.x += impulseStrength
            // torque.z -= torqueStrength
            setControls({ ...controls, rightward: false })

        }

        if (backward) {
            impulse.z += impulseStrength
            // torque.x += torqueStrength
            setControls({ ...controls, backward: false })
        }

        if (leftward) {
            impulse.x -= impulseStrength
            // torque.z += torqueStrength
            setControls({ ...controls, leftward: false })
        }

        if(controls.jump){
            jump()
            setControls({ ...controls, jump: false })
        }

        body.current.applyImpulse(impulse)
        // body.current.applyTorqueImpulse(torque)

        /**
         * Camera
         */
        const bodyPosition = body.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 2.25
        cameraPosition.y += cameraZoom // close up
        // cameraPosition.y += 3.5 // zoom out
        // cameraPosition.y += 50 // super far out

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

        /**
        * Out of bounds Reset
        */
        if (bodyPosition.y < - 9.8)
            reset()
    });


    return (
        <>
            <RigidBody
                ref={body}
                colliders="hull"
                restitution={0.2}
                friction={1}
                linearDamping={0.5}
                angularDamping={0.5}
                position={[0.6, 1, -2.8]}
            >
                <Gltf src={avatar.glb} scale={avatar.gameScale} castShadow />
            </RigidBody>
        </>
    );
}