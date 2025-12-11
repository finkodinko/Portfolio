'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function ContactBackdropScene() {
  const orbRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      orbRef.current.rotation.x += 0.0003;
      orbRef.current.rotation.y += 0.0005;
    }

    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0001;
    }
  });

  // Prefers reduced motion check
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff0088" />

      {/* Main pulsing orb */}
      <mesh ref={orbRef} position={[0, 0, -5]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#001a4d"
          emissive="#0066ff"
          emissiveIntensity={prefersReducedMotion ? 0.1 : 0.2}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Floating planes for depth */}
      <group ref={groupRef}>
        <mesh position={[3, 2, -3]}>
          <planeGeometry args={[2, 2, 8, 8]} />
          <meshStandardMaterial
            color="#000033"
            wireframe={true}
            wireframeLinewidth={1}
            transparent
            opacity={prefersReducedMotion ? 0.1 : 0.15}
          />
        </mesh>

        <mesh position={[-3, -2, -4]} rotation={[0.5, 0.5, 0]}>
          <planeGeometry args={[2.5, 2.5, 8, 8]} />
          <meshStandardMaterial
            color="#330033"
            wireframe={true}
            wireframeLinewidth={1}
            transparent
            opacity={prefersReducedMotion ? 0.1 : 0.12}
          />
        </mesh>
      </group>

      {/* Accent light */}
      <pointLight position={[5, 5, 0]} intensity={0.4} color="#ff0088" />
    </>
  );
}

export function ContactBackdropCanvas() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ContactBackdropScene />
      </Canvas>
    </div>
  );
}
