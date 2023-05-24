import { Environment, Gltf } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function ItemModel({ glb, scale }) {
    return (
        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 0, 10]
            }}
            style={{ height: '100px', width: '120px' }}
        >
            <Suspense fallback={null}>
                <Environment preset="city" />
                <Gltf src={glb} rotation-x={0.5} scale={scale} />
            </Suspense>
        </Canvas>
    );
}