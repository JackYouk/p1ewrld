

export default function Mansion({ nodes, materials }) {

    return (
        <>
            <group name="th_110" position={[1, 3.99, 2]}>
                <mesh
                    name="Object_220"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_220.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}