import { Environment,  } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function BuildingModel({children}) {

    return(
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
        {children}
    </Canvas>
    );
}