import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { DnaDoubleHelix } from './DnaDoubleHelix';
import { CameraRig } from './CameraRig';
import { type SandboxConfig } from '../../hooks/useScrollStore';

interface Background3DProps {
  config: SandboxConfig;
}

export const Background3D: React.FC<Background3DProps> = ({ config }) => {
  const colorMap = useMemo(() => ({
    cyan: '#0D9488',
    emerald: '#059669',
    violet: '#7C3AED',
    amber: '#D97706',
  }), []);

  const activeColor = colorMap[config.colorScheme] || '#0D9488';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ opacity: 0.95 }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        dpr={[1, 2]}
      >
        <AdaptiveDpr pixelated />
        
        {/* Atmósfera Blanca Hospitalaria Serena #F8FAFC */}
        <fogExp2 attach="fog" args={['#F8FAFC', 0.022]} />

        {/* Iluminación Médica Brillante y Suave */}
        <ambientLight intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[5, 10, 7]} intensity={2.2} color="#F0FDFA" />
        <pointLight position={[-4, 4, 3]} intensity={3.5} color={activeColor} />
        <pointLight position={[4, -4, 2]} intensity={2.5} color="#2563EB" />

        <CameraRig />

        {/* Doble Hélice de ADN que se sintetiza y une con el Scroll */}
        <DnaDoubleHelix config={config} />
      </Canvas>
    </div>
  );
};

export default Background3D;
