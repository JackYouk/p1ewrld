

export default function Houses({ nodes, materials }) {

    return (
        <>
            <group name="house_01_51" position={[4.4, 2.99, 0]}>
                <mesh
                    name="Object_102"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_102.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group
                name="house_01001_52"
                position={[5.5, 1.99, 5.6]}
                scale={0.85}
            >
                <mesh
                    name="Object_104"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_104.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group
                name="house_01002_53"
                position={[2.2, 1.02, 7.6]}
                scale={0.85}
            >
                <mesh
                    name="Object_106"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_106.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}