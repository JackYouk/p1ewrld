import { useRapier, RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls, useAnimations, useGLTF, Gltf } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import useGame from '../stores/useGame.jsx'
import { AvatarContext } from '../stores/avatarContext.jsx'
import nipplejs from 'nipplejs';


export default function Player(){
    const {avatar, setAvatar} = AvatarContext();
    const body = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()
    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 20, 10))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())
    const start = useGame((state) => state.start)
    const end = useGame((state) => state.end)
    const restart = useGame((state) => state.restart)
    const blocksCount = useGame((state) => state.blocksCount)

    const jump = () =>
    {
        const origin = body.current.translation()
        origin.y -= 0.31
        const direction = { x: 0, y: - 1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = rapierWorld.castRay(ray, 10, true)

        if(hit.toi < 0.15)
        {
            body.current.applyImpulse({ x: 0, y: 0.1, z: 0 })
        }
    }
    
    const reset = () =>
    {
        body.current.setTranslation({ x: 0, y: 1, z: 0 })
        body.current.setLinvel({ x: 0, y: 0, z: 0 })
        body.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

    useEffect(() =>
    {
        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,
            (value) =>
            {
                if(value === 'ready')
                    reset()
            }
        )

        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) =>
            {
                if(value)
                    jump()
            }
        )

        const unsubscribeAny = subscribeKeys(
            () =>
            {
                start()
            }
        )

        return () =>
        {
            unsubscribeReset()
            unsubscribeJump()
            unsubscribeAny()
        }
    }, [])

    let controls = { 
        forward: false, 
        backward: false, 
        leftward: false, 
        rightward: false 
    }

    useFrame((state, delta) =>
    {
        /**
         * Controls
         */
        const { forward, backward, leftward, rightward } = controls

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 3.0 * delta
        const torqueStrength = 0.6 * delta

        if(forward)
        {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
            controls = {...controls, forward: false}
        }

        if(rightward)
        {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
            controls = {...controls, rightward: false}

        }

        if(backward)
        {
            impulse.z += impulseStrength
            torque.x += torqueStrength
            controls = {...controls, backward: false}

        }
        
        if(leftward)
        {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
            controls = {...controls, leftward: false}

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
        cameraPosition.y += 0.65

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

        /**
        * Phases
        */
        if(bodyPosition.y < - 9.8)
            reset()
    });



    const sampleJoystick = {
        mode: 'static',
        position: {
            left: '15%',
            bottom: '12%'
        },
        size: 80,
        color: '#ffffff',
        dynamicPage: true,
        // zone: document.getElementById('zone_joystick'),
    };
    const joystick = nipplejs.create(sampleJoystick);
    let position;

    joystick
            .on('start end', function (evt, data) { position = data })
            .on('move', function (evt, data) { position = data })
            .on('plain:up', function (evt, data) { 
                controls = {...controls, forward: true}  
            })
            .on('plain:down', function (evt, data) { 
                controls = {...controls, backward: true}  
            })
            .on('plain:right', function (evt, data) { 
                controls = {...controls, rightward: true}  
            })
            .on('plain:left', function (evt, data) { 
                controls = {...controls, leftward: true}  
            })
            .on('pressure', function (evt, data) { position = data })
            .on('added', function (evt, nipple) {
                nipple.on('start move end dir plain', function (evt) {
                    // DO EVERYTHING
                });
            })
            .on('removed', function (evt, nipple) {
                nipple.off('start move end dir plain');
            });

            useEffect(() => {
                // Your setup code here. This runs when your component mounts
            
                return () => {
                  // Your cleanup code here. This will be called when your component is unmounted
                  joystick.destroy()
                };
              }, []);

    return <RigidBody
        ref={ body }
        colliders="hull"
        restitution={ 0.2 }
        friction={ 1 } 
        linearDamping={ 0.5 }
        angularDamping={ 0.5 }
        position={ [ 0.6, 1, -2.8 ] }
    >
        {/* <mesh castShadow>
            <icosahedronGeometry args={ [ 0.3, 1 ] } />
            <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh> */}
        {/* <primitive object={fox.scene} scale={0.005} /> */}
        <Gltf src={avatar.glb} scale={avatar.gameScale} castShadow/>
    </RigidBody>
}