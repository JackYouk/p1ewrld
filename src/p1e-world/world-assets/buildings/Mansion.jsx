

export function WorldMansion({ nodes, materials }) {

    return (
        <>
            <group name="th_110" position={[1, 3.99, 2]}>
                <mesh
                    name="Object_220"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_220.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}

export function MarketMansion({ nodes, materials, scale, position }) {

    return (
        <>
            <group scale={scale ?? 2} position={position ?? [0, 0, 0]}>
                <mesh
                    name="Object_220"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_220.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}