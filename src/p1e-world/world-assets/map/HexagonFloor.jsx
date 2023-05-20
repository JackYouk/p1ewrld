

export default function HexagonFloor({ nodes, materials }) {

    return (
        <>
            <group name="Plane_2" scale={90.62}>
                <mesh
                    name="Object_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_4.geometry}
                    material={materials["hex.001"]}
                />
            </group>
        </>
    )
}