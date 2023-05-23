

export function WorldCrossbows({ nodes, materials }) {

    return (
        <>
            <group
                name="Crossbow001_40"
                position={[-1.1, 3.02, 5.6]}
                scale={0.21}
            >
                <mesh
                    name="Object_80"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_80.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group
                name="Crossbow002_42"
                position={[3.3, 3.02, 5.6]}
                scale={0.21}
            >
                <mesh
                    name="Object_84"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_84.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group
                name="Crossbow003_44"
                position={[6.6, 3.02, -0.2]}
                scale={0.21}
            >
                <mesh
                    name="Object_88"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_88.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group
                name="Crossbow004_46"
                position={[-0.03, 5, -0.15]}
                scale={0.21}
            >
                <mesh
                    name="Object_92"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_92.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group name="Tower001_39" position={[-1.1, 2.02, 5.6]}>
                <mesh
                    name="Object_78"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_78.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group name="Tower002_41" position={[3.3, 2.01, 5.6]}>
                <mesh
                    name="Object_82"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_82.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group name="Tower003_43" position={[6.6, 2.02, -0.2]}>
                <mesh
                    name="Object_86"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_86.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group name="Tower004_45" position={[-0.03, 3.99, -0.15]}>
                <mesh
                    name="Object_90"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_90.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}

export function MarketCrossbows({ nodes, materials, scale, position }) {

    return (
        <>
            <group scale={scale ?? 2} position={position ?? [0, 0, 0]}>
                <group
                    name="Crossbow001_40"
                    position={[0, 1, 0]}
                    scale={0.21}
                >
                    <mesh
                        name="Object_80"
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_80.geometry}
                        material={materials.lpb_gradient}
                    />
                </group>
                <group name="Tower001_39" position={[0, 0, 0]}>
                    <mesh
                        name="Object_78"
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_78.geometry}
                        material={materials.lpb_gradient}
                    />
                </group>
            </group>

        </>
    )
}