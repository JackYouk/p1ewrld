

export function WorldPub({ nodes, materials }) {

    return (
        <>
            <group name="BerrHouse_3" position={[-2, 3.99, 0.31]}>
                <mesh
                    name="Object_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_6.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}

export function MarketPub({ nodes, materials, scale, position }) {

    return (
        <>
            <group scale={scale ?? 2} position={position ?? [0, 0, 0]}>
                <mesh
                    name="Object_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_6.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}