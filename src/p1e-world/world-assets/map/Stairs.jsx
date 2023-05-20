

export default function Stairs({ nodes, materials }) {

    return (
        <>
            <group
                name="Tower2001_108"
                position={[2.98, 3.15, 2.1]}
                rotation={[0, Math.PI / 2, 0]}
            >
                <mesh
                    name="Object_216"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_216.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
            <group
                name="Tower2002_109"
                position={[0.8, 2.14, 5.52]}
                rotation={[0, 0.53, 0]}
            >
                <mesh
                    name="Object_218"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_218.geometry}
                    material={materials.lpb_gradient}
                />
            </group>
        </>
    )
}