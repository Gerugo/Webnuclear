import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { global3DState } from '../../hooks/useScrollStore';

export const CyberGrid: React.FC = () => {
  const ringsRef = useRef<THREE.Group>(null);
  const orbitalGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const p = global3DState.progress;
    const elapsedTime = state.clock.getElapsedTime();

    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, idx) => {
        child.rotation.z += delta * (0.08 + idx * 0.04) * (idx % 2 === 0 ? 1 : -1);
        child.rotation.x = Math.sin(elapsedTime * 0.3 + idx) * 0.15;
      });
      ringsRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.15;
    }

    if (orbitalGlowRef.current) {
      orbitalGlowRef.current.rotation.z -= delta * 0.03;
      const s = 1 + Math.sin(elapsedTime * 1.5) * 0.05 + p * 0.2;
      orbitalGlowRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      {/* Halo de luz suave biocompatible / Tomografía PET */}
      <mesh ref={orbitalGlowRef} position={[0, 0, -2]}>
        <ringGeometry args={[3.8, 6.2, 64]} />
        <meshBasicMaterial
          color="#00D4B2"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Anillos de Enfoque y Trazabilidad Molecular */}
      <group ref={ringsRef}>
        {[0, 1, 2].map((i) => {
          const radius = 3.6 + i * 1.1;
          return (
            <mesh key={i} rotation={[Math.PI / 3 + i * 0.3, i * 0.4, 0]}>
              <ringGeometry args={[radius, radius + 0.015, 80]} />
              <meshBasicMaterial
                color={i === 1 ? '#3B82F6' : '#00D4B2'}
                transparent
                opacity={0.18 - i * 0.04}
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};
