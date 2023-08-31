import { Center, Gltf, OrbitControls, Text, Text3D, shaderMaterial } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from 'three';


const PortalMaterial = shaderMaterial(
    {
        iTime: 0,
        iResolution: new THREE.Color(1.0, 1.0, 1.0)
    },  // vertex shader
    /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  // fragment shader
  /*glsl*/ `
uniform float iTime;
uniform vec3 iResolution;

varying vec2 vUv;

float polygonDistance(vec2 p, float radius, float angleOffset, int sideCount) {
    float a = atan(p.x, p.y) + angleOffset;
    float b = 6.28319 / float(sideCount);
    return cos(floor(.5 + a / b) * b - a) * length(p)*5. - radius*2.;
}

#define HASHSCALE1 443.8975
float hash11(float p) // assumes p in ~0-1 range
{
    vec3 p3  = fract(vec3(p) * HASHSCALE1);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

#define HASHSCALE3 vec3(.1031, .1030, .0973)
vec2 hash21(float p) // assumes p in larger integer range
{
    vec3 p3 = fract(vec3(p) * HASHSCALE3);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract(vec2((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y));
}

void main() {
    vec2 uv = (vUv * iResolution.xy - 0.5 * iResolution.xy) / iResolution.y;
    uv.x *= iResolution.x / iResolution.y;
    
    float accum = 0.;
    for(int i = 0; i < 83; i++) {
        float fi = float(i);
        float thisYOffset = mod(hash11(fi * 0.017) * (iTime*5. + 19.) * 0.2, 4.0) - 2.0;
        vec2 center = (hash21(fi) * 2. - 1.) * vec2(1.1, 1.0) - vec2(0.0, thisYOffset);
        float radius = 0.5;
        vec2 offset = uv - center;
        float twistFactor = (hash11(fi * 0.0347) * 2. - 1.) * 1.9;
        float rotation = 0.1 + iTime*5. * 0.2 + sin(iTime*5. * 0.1) * 0.9 + (length(offset) / radius) * twistFactor;
        accum += pow(smoothstep(radius, 0.0, polygonDistance(uv - center, 0.1 + hash11(fi * 2.3) * 0.2, rotation, 5) + 0.1), 3.0);
    }
    
    vec3 subColor = vec3(0.4, 0.8, 0.2);
    vec3 addColor = vec3(0.3, 0.2, 0.1);
    
    gl_FragColor = vec4(vec3(.5) - accum * subColor + addColor, 1.0);
}
  `

)
extend({ PortalMaterial })

function Scene() {
    const portalMaterial1 = useRef();
    const portalMaterial2 = useRef();
    const pie1 = useRef();

    useFrame((state, delta) => {
        portalMaterial1.current.iTime += delta*.5;
        portalMaterial2.current.iTime += delta*.5;
        pie1.current.rotation.y += delta * 0.1;
    });

    return(
        <>
        <ambientLight intensity={0.5} />
        <pointLight intensity={1} position={[0, 1, 0]} />
        {/* <mesh>
            <boxGeometry />
            <meshBasicMaterial color='blue' />
        </mesh> */}
        <Gltf ref={pie1} src="/pie.glb" scale={0.75} position={[0, 0, -6]} rotation={[Math.PI/2, 0, 0]} />
        <Center position={[0, 3, 0]}>
        <Text3D scale={0.6} position-x={-1.5}  font="./Lilita_One_Regular.json">
            P1E
            <portalMaterial ref={portalMaterial2} />
        </Text3D>
        <Text3D scale={0.6}  font="./Lilita_One_Regular.json">
            WRLD
            <portalMaterial ref={portalMaterial1} />
        </Text3D>
        </Center>
        <Center position={[0, -3, 0]}>
        <Text3D scale={0.3} position-x={-1.4}  font="./Lilita_One_Regular.json">
            TAP TO
            <portalMaterial ref={portalMaterial2} />
        </Text3D>
        <Text3D scale={0.3}  font="./Lilita_One_Regular.json">
            CONTINUE
            <portalMaterial ref={portalMaterial1} />
        </Text3D>
        </Center>
        </>
    )
}

export default function MainMenu() {
    const navigate = useNavigate();
    return(
        <>
        <Canvas onClick={() => navigate('/wrld')}>
        <Scene />
        </Canvas>
        </>
    );
}

