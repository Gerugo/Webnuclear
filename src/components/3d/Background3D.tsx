import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { AtomicNucleus } from './AtomicNucleus';
import { RadioactiveCloud } from './RadioactiveCloud';
import { CyberGrid } from './CyberGrid';
import { CameraRig } from './CameraRig';
import { type SandboxConfig } from '../../hooks/useScrollStore';

interface Background3DProps {
  config: SandboxConfig;
}

const ContinuousRotatingScene: React.FC<{ children: React.ReactNode; speed: number }> = ({ children, speed }) => {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    if (sceneRef.current) {
      sceneRef.current.rotation.y += delta * 0.035 * speed;
      sceneRef.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.025;
      sceneRef.current.rotation.z = Math.cos(elapsedTime * 0.15) * 0.018;
    }
  });

  return <group ref={sceneRef}>{children}</group>;
};

export const Background3D: React.FC<Background3DProps> = ({ config }) => {
  const colorMap = useMemo(() => ({
    cyan: '#00D4B2',
    emerald: '#10B981',
    violet: '#8B5CF6',
    amber: '#F59E0B',
  }), []);

  const activeColor = colorMap[config.colorScheme] || '#00D4B2';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ opacity: 0.96 }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        dpr={[1, 2]}
      >
        <AdaptiveDpr pixelated />
        
        {/* Atmósfera Serena y Profunda de Azul Marino Clínico #0A0F1E */}
        <fogExp2 attach="fog" args={['#0A0F1E', 0.024]} />

        {/* Iluminación Médica Suave y Cálida */}
        <ambientLight intensity={2.2} color="#0F172A" />
        <pointLight position={[0, 3, 5]} intensity={3.0} color={activeColor} />
        <pointLight position={[-3, -2, -2]} intensity={2.0} color="#3B82F6" />

        <CameraRig />

        <ContinuousRotatingScene speed={config.speed}>
          <AtomicNucleus config={config} />
          <RadioactiveCloud config={config} />
        </ContinuousRotatingScene>
        
        <CyberGrid />
      </Canvas>
    </div>
  );
};

export default Background3D;
