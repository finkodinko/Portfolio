'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Generate random positions outside component
const generateParticlePositions = (count: number): Float32Array => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }
  return positions;
};

function BackdropScene() {
  const meshRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create particle field
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = generateParticlePositions(100);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0001;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.z += 0.0001;
    }
  });

  // Prefers reduced motion check
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      {/* Soft ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff0088" />

      {/* Particle field backdrop */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.05}
          color="#00ffff"
          sizeAttenuation={true}
          transparent
          opacity={prefersReducedMotion ? 0.2 : 0.15}
        />
      </points>

      {/* Animated plane */}
      <group ref={meshRef}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[8, 8, 32, 32]} />
          <meshStandardMaterial
            color="#001133"
            metalness={0.3}
            roughness={0.7}
            wireframe={false}
          />
        </mesh>
      </group>

      {/* Floating orbs */}
      <mesh position={[2, 1, -5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.2} />
      </mesh>

      <mesh position={[-3, -1, -4]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ff0088" emissive="#ff0088" emissiveIntensity={0.2} />
      </mesh>
    </>
  );
}

export function StudioBackdropCanvas() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <BackdropScene />
      </Canvas>
    </div>
  );
}
