import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function WaveMesh() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value =
        clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[20, 20, 256, 256]} />
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#facc15") },
        }}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;

          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 2.0 + uTime) * 0.3;
            pos.z += sin(pos.y * 3.0 + uTime) * 0.2;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying vec2 vUv;

          void main() {
            gl_FragColor = vec4(uColor, 0.25);
          }
        `}
        transparent
      />
    </mesh>
  );
}

export default function WaveBackground() {
  return (
    <Canvas
      camera={{ position: [0, 3, 5], fov: 45 }}
      className="absolute inset-0"
    >
      <ambientLight intensity={1} />
      <WaveMesh />
    </Canvas>
  );
}
