
import { Float, Text3D } from '@react-three/drei'


export default function FloatingName({ position = [0, 0, 0], scale }) {
    return (
        <group position={position} scale={scale}>
            <Float floatIntensity={0.25} rotationIntensity={0.25}>
                <Text3D
                    font={"./Neue_Regular.json"}
                    position={[0, 0.65, -3.4]}
                    rotation-y={-0.3}
                    scale={0.3}
                    lineHeight={0.8}
                    textAlign="left"
                    castShadow
                >
                    {`P1E\nWorld`}
                    <meshStandardMaterial color={'purple'} />
                </Text3D>
            </Float>
        </group>
    );
}