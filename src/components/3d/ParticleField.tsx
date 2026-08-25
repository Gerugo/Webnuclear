import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { particleVertexShader, particleFragmentShader } from './shaders';
import { global3DState, type SandboxConfig } from '../../hooks/useScrollStore';

interface ParticleFieldProps {
  config: SandboxConfig;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ config }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorMap = useMemo(() => ({
    cyan: { primary: new THREE.Color(0x00f5d4), accent: new THREE.Color(0x7000ff) }, // Cian nuclear #00F5D4
    emerald: { primary: new THREE.Color(0x00ff9d), accent: new THREE.Color(0x00f5d4) },
    violet: { primary: new THREE.Color(0x9d4edd), accent: new THREE.Color(0xff007f) },
    amber: { primary: new THREE.Color(0xffb703), accent: new THREE.Color(0xff0055) },
  }), []);

  const currentPalette = colorMap[config.colorScheme] || colorMap.cyan;

  const count = useMemo(() => Math.floor(10000 * config.particleDensity), [config.particleDensity]);

  const [positions, scales, phaseOffsets] = useMemo(() => {
    const pPositions = new Float32Array(count * 3);
    const pScales = new Float32Array(count);
    const pPhaseOffsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      pScales[i] = 0.5 + Math.random() * 1.8;
      pPhaseOffsets[i] = Math.random() * Math.PI * 2;
    }

    return [pPositions, pScales, pPhaseOffsets];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSpeed: { value: config.speed },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: currentPalette.primary },
      uAccent: { value: currentPalette.accent },
    }),
    [config.speed, currentPalette]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uProgress.value = global3DState.progress;
      materialRef.current.uniforms.uSpeed.value = config.speed;
      materialRef.current.uniforms.uMouse.value.set(global3DState.mouse.x, global3DState.mouse.y);
      materialRef.current.uniforms.uColor.value = currentPalette.primary;
      materialRef.current.uniforms.uAccent.value = currentPalette.accent;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aPhaseOffset"
          args={[phaseOffsets, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
      />
    </points>
  );
};
