'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Generate random particle positions outside component
const generateParticlePositions = (count: number): Float32Array => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 4;
    positions[i + 1] = (Math.random() - 0.5) * 4;
    positions[i + 2] = (Math.random() - 0.5) * 4;
  }
  return positions;
};

interface ProcessVizSceneProps {
  activeStep: number;
}

function ProcessVizScene({ activeStep }: ProcessVizSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = generateParticlePositions(50);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.z += 0.0003;
    }

    // Animate mesh based on step
    if (meshRef.current && meshRef.current.children.length > 0) {
      const stepProgram = [
        { scale: 0.3, opacity: 1 },
        { scale: 0.6, opacity: 0.8 },
        { scale: 0.8, opacity: 0.9 },
        { scale: 1, opacity: 1 },
        { scale: 1, opacity: 0.7 },
      ];

      const target = stepProgram[Math.min(activeStep, 4)];
      meshRef.current.scale.lerp(new THREE.Vector3(target.scale, target.scale, target.scale), 0.05);
      
      meshRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            const material = mat as THREE.Material & { opacity?: number };
            if (material.transparent) material.opacity = target.opacity;
          });
        } else if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.Material & { opacity?: number };
          if (material.transparent) {
            material.opacity = target.opacity;
          }
        }
      });
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00ffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff0088" />

      {/* Particles */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.05}
          color={activeStep === 0 ? '#00ffff' : activeStep === 1 ? '#00d4ff' : '#ff0088'}
          sizeAttenuation={true}
          transparent
          opacity={0.3}
        />
      </points>

      {/* Main mesh that changes based on step */}
      <group ref={groupRef}>
        {/* Step 0: Sphere */}
        {activeStep === 0 && (
          <mesh ref={meshRef}>
            <icosahedronGeometry args={[1, 2]} />
            <meshStandardMaterial color="#00ffff" wireframe={false} emissive="#00ffff" emissiveIntensity={0.3} />
          </mesh>
        )}

        {/* Step 1: Wireframe cube */}
        {activeStep === 1 && (
          <mesh ref={meshRef}>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshStandardMaterial color="#00d4ff" wireframe={true} />
          </mesh>
        )}

        {/* Step 2: Solid object */}
        {activeStep === 2 && (
          <mesh ref={meshRef}>
            <octahedronGeometry args={[0.8, 2]} />
            <meshStandardMaterial color="#ff9500" emissive="#ff9500" emissiveIntensity={0.2} />
          </mesh>
        )}

        {/* Step 3: Glowing object */}
        {activeStep === 3 && (
          <mesh ref={meshRef}>
            <torusGeometry args={[0.8, 0.3, 16, 100]} />
            <meshStandardMaterial
              color="#ff0088"
              emissive="#ff0088"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        )}

        {/* Step 4: Complex shape */}
        {activeStep === 4 && (
          <mesh ref={meshRef}>
            <dodecahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.4}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        )}
      </group>
    </>
  );
}

interface ProcessVizCanvasProps {
  activeStep: number;
}

export function ProcessVizCanvas({ activeStep }: ProcessVizCanvasProps) {
  return (
    <div className="w-full h-96 md:h-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ProcessVizScene activeStep={activeStep} />
      </Canvas>
    </div>
  );
}
