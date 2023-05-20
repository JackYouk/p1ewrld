import { Environment, Gltf } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

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
            style={{ height: '175px', width: '175px' }}
        >
            <Environment preset="city" />
            <Gltf src={glb} rotation-x={0.5} scale={scale} />
        </Canvas>
    );
}