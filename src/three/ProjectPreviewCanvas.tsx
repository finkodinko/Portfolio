'use client';

import { Canvas } from '@react-three/fiber';
import { useMatcapTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Project } from '@/content/projects';

interface SceneProps {
  project: Project;
  scale?: number;
}

function Scene({ project, scale = 1 }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [matcap] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

  const shapeType = useMemo(() => {
    const hash = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const types = ['sphere', 'cube', 'shard'];
    return types[hash % types.length];
  }, [project.id]);

  const rotationSpeed = useMemo(() => {
    const hash = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 0.1 + (hash % 50) / 100;
  }, [project.id]);

  const accentColor = useMemo(() => {
    return new THREE.Color(project.accentColor || '#00ffff');
  }, [project.accentColor]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    switch (shapeType) {
      case 'cube':
        return <boxGeometry args={[1 * scale, 1 * scale, 1 * scale]} />;
      case 'shard':
        return <octahedronGeometry args={[0.7 * scale, 0]} />;
      default:
        return <icosahedronGeometry args={[0.7 * scale, 1]} />;
    }
  }, [shapeType, scale]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={accentColor} />
      
      <mesh ref={meshRef}>
        {geometry}
        <meshMatcapMaterial matcap={matcap} />
      </mesh>

      <mesh ref={meshRef} scale={1.02}>
        {geometry}
        <meshBasicMaterial color={accentColor} transparent opacity={0.1} wireframe />
      </mesh>
    </>
  );
}

interface ProjectPreviewCanvasProps {
  project: Project;
  scale?: number;
  className?: string;
}

export function ProjectPreviewCanvas({ project, scale = 1, className = '' }: ProjectPreviewCanvasProps) {
  return (
    <div className={`${className}`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Scene project={project} scale={scale} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
