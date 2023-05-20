

export default function Banks({ nodes, materials }) {

    return (
        <>
            <group name="GoldTower_49" position={[5.5, 1.99, 1.7]}>
                <mesh
                    name="Object_98"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_98.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group name="GoldTower001_50" position={[-1.1, 4.98, -2]}>
                <mesh
                    name="Object_100"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_100.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}