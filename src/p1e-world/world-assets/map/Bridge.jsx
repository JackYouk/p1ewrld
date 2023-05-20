

export default function Bridge({ nodes, materials }) {

    return (
        <>
            <group name="Bridge_4" position={[2.14, 2.88, 3.78]}>
                <mesh
                    name="Object_8"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}