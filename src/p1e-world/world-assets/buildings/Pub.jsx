

export default function Pub({ nodes, materials }) {

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