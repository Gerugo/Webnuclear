import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { global3DState } from '../../hooks/useScrollStore';

export const CyberGrid: React.FC = () => {
  const floorGridRef = useRef<THREE.GridHelper>(null);
  const ceilingGridRef = useRef<THREE.GridHelper>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const p = global3DState.progress;
    const elapsedTime = state.clock.getElapsedTime();

    if (floorGridRef.current) {
      floorGridRef.current.position.z = (elapsedTime * 4 + p * 30) % 2;
    }
    if (ceilingGridRef.current) {
      ceilingGridRef.current.position.z = (elapsedTime * 4 + p * 30) % 2;
    }

    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, idx) => {
        child.rotation.z += delta * (0.15 + idx * 0.08) * (idx % 2 === 0 ? 1 : -1);
        child.rotation.x += delta * 0.05;
      });
    }
  });

  return (
    <group>
      {/* Infinite Cyber Floor Grid - Cian Nuclear */}
      <gridHelper
        ref={floorGridRef}
        args={[80, 80, '#00F5D4', '#0d1525']}
        position={[0, -5.5, 0]}
      >
        <lineBasicMaterial attach="material" transparent opacity={0.35} color="#00F5D4" />
      </gridHelper>

      {/* Cyber Ceiling Grid - Cobalto / Energía #4361EE */}
      <gridHelper
        ref={ceilingGridRef}
        args={[80, 80, '#4361EE', '#0d1525']}
        position={[0, 7.5, 0]}
      >
        <lineBasicMaterial attach="material" transparent opacity={0.25} color="#4361EE" />
      </gridHelper>

      {/* Concentric Orbital Rings */}
      <group ref={ringsRef}>
        {[0, 1, 2].map((i) => {
          const radius = 3.4 + i * 0.9;
          return (
            <mesh key={i} rotation={[Math.PI / 3 + i * 0.4, i * 0.5, 0]}>
              <ringGeometry args={[radius, radius + 0.02, 64]} />
              <meshBasicMaterial
                color={i === 1 ? '#4361EE' : '#00F5D4'}
                transparent
                opacity={0.25 - i * 0.05}
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};
