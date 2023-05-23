

export function WorldBlacksmith({ nodes, materials }) {

    return (
        <>
            <group name="farmHouse001_107" position={[-0.37, 2.99, 3.73]}>
                <mesh
                    name="Object_214"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_214.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}

export function MarketBlacksmith({ nodes, materials, scale, position }) {

    return (
        <>
            <group scale={scale ?? 2} name="farmHouse001_107" position={position ?? [0, 0, 0]}>
                <mesh
                    name="Object_214"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_214.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}