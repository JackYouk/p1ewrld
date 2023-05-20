

export default function Windmill({ nodes, materials }) {

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