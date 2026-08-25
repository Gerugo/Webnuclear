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

// Contenedor con rotación sutil continua de toda la escena 3D en useFrame
const ContinuousRotatingScene: React.FC<{ children: React.ReactNode; speed: number }> = ({ children, speed }) => {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    if (sceneRef.current) {
      // Rotación orbital continua y ondulación armónica sutil
      sceneRef.current.rotation.y += delta * 0.05 * speed;
      sceneRef.current.rotation.x = Math.sin(elapsedTime * 0.25) * 0.035;
      sceneRef.current.rotation.z = Math.cos(elapsedTime * 0.2) * 0.025;
    }
  });

  return <group ref={sceneRef}>{children}</group>;
};

export const Background3D: React.FC<Background3DProps> = ({ config }) => {
  const colorMap = useMemo(() => ({
    cyan: '#00F5D4',   // Cian nuclear
    emerald: '#00ff9d',
    violet: '#9d4edd',
    amber: '#ffb703',
  }), []);

  const activeColor = colorMap[config.colorScheme] || '#00F5D4';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ opacity: 0.95 }}>
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
        
        {/* Niebla atmosférica profunda con fondo base #080B10 */}
        <fogExp2 attach="fog" args={['#080B10', 0.025]} />

        {/* Luces Ambiental y Puntual Dinámica */}
        <ambientLight intensity={2.0} color="#0d1420" />
        <pointLight position={[0, 2, 4]} intensity={3.5} color={activeColor} />
        <pointLight position={[0, -2, -3]} intensity={2.0} color="#4361EE" />

        {/* Coreografía Cinemática de Cámara (Scrollytelling) */}
        <CameraRig />

        {/* Grupo con Rotación Continua Sutil en useFrame */}
        <ContinuousRotatingScene speed={config.speed}>
          <AtomicNucleus config={config} />
          <RadioactiveCloud config={config} />
        </ContinuousRotatingScene>
        
        {/* Rejilla de Profundidad Cibernética */}
        <CyberGrid />
      </Canvas>
    </div>
  );
};

export default Background3D;
