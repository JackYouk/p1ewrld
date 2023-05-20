

export default function Blacksmith({ nodes, materials }) {

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