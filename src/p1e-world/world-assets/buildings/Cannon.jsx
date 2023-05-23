

export function WorldCannon({ nodes, materials }) {

    return (
        <>
            <group name="Tower2_38" position={[3.92, 3, 1.7]}>
                <group name="cannon_37" position={[0, 1.3, -0.01]}>
                    <mesh
                        name="Object_76"
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_76.geometry}
                        material={materials.lpb_gradient}
                    />
                </group>
                <mesh
                    name="Object_74"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_74.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}

export function MarketCannon({ nodes, materials, scale, position }) {

    return (
        <>
            <group scale={scale ?? 2} name="Tower2_38" position={position ?? [0, 0, 0]}>
                <group name="cannon_37" position={[0, 1.3, -0.01]}>
                    <mesh
                        name="Object_76"
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_76.geometry}
                        material={materials.lpb_gradient}
                    />
                </group>
                <mesh
                    name="Object_74"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_74.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}