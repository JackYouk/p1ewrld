

export function WorldWaterwheel({ nodes, materials }) {

    return (
        <>
            <group
                name="WaterHouse_166"
                position={[-1.74, 2.99, 1.88]}
                rotation={[0, -Math.PI / 2, 0]}
            >
                <mesh
                    name="Object_332"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_332.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group
                name="Cylinder_167"
                position={[-2.09, 3.37, 1.85]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <mesh
                    name="Object_334"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_334.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}

export function MarketWaterwheel({ nodes, materials, scale, position }) {

    return (
        <>
            <group scale={scale ?? 2} position={position ?? [0, 0, 0]}>
                <group
                    name="WaterHouse_166"
                    position={[0.35, 0, 0.03]}
                    rotation={[0, -Math.PI / 2, 0]}
                >
                    <mesh
                        name="Object_332"
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_332.geometry}
                        material={materials.lpb_gradient}
                    />
                </group>
                <group
                    name="Cylinder_167"
                    position={[0, 0.38, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                >
                    <mesh
                        name="Object_334"
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_334.geometry}
                        material={materials.lpb_gradient}
                    />
                </group>
            </group>
        </>
    )
}