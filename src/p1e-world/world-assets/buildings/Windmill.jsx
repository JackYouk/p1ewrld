

export function WorldWindmill({ nodes, materials }) {

    return (
        <>
            <group name="fan_48" position={[4.35, 3.72, 4.96]}>
                <mesh
                    name="Object_96"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_96.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group name="farmHouse_47" position={[4.38, 2.99, 4.24]}>
                <mesh
                    name="Object_94"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_94.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}


export function MarketWindmill({ nodes, materials, scale, position }) {

    return (
        <>
            <group scale={scale ?? 2} position={position ?? [0, 0, 0]}>
                <group name="fan_48" position={[0, 0.73, 0.72]}>
                    <mesh
                        name="Object_96"
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_96.geometry}
                        material={materials.lpb_gradient}
                    />
                </group>
                <group name="farmHouse_47" position={[0.03, 0, 0]}>
                    <mesh
                        name="Object_94"
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_94.geometry}
                        material={materials.lpb_gradient}
                    />
                </group>
            </group>
        </>
    )
}