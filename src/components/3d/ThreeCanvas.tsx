import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { ProceduralCore } from './ProceduralCore';
import { ParticleField } from './ParticleField';
import { CyberGrid } from './CyberGrid';
import { CameraRig } from './CameraRig';
import { type SandboxConfig } from '../../hooks/useScrollStore';

interface ThreeCanvasProps {
  config: SandboxConfig;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ config }) => {
  const colorMap = useMemo(() => ({
    cyan: '#00F5D4', // Cian nuclear
    emerald: '#00ff9d',
    violet: '#9d4edd',
    amber: '#ffb703',
  }), []);

  const activeColor = colorMap[config.colorScheme] || '#00F5D4';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity: 0.95 }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <AdaptiveDpr pixelated />
        
        {/* Deep Atmospheric Fog with #080B10 base */}
        <fogExp2 attach="fog" args={['#080B10', 0.025]} />

        {/* Ambient & Point Lights */}
        <ambientLight intensity={2.0} color="#0d1420" />
        <pointLight position={[0, 2, 4]} intensity={3} color={activeColor} />

        {/* Scrollytelling Camera Rig */}
        <CameraRig />

        {/* 3D Procedural Modules */}
        <ProceduralCore config={config} />
        <ParticleField config={config} />
        <CyberGrid />
      </Canvas>
    </div>
  );
};
