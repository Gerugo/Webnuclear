import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { coreVertexShader, coreFragmentShader } from './shaders';
import { global3DState, type SandboxConfig } from '../../hooks/useScrollStore';

interface ProceduralCoreProps {
  config: SandboxConfig;
}

export const ProceduralCore: React.FC<ProceduralCoreProps> = ({ config }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorMap = useMemo(() => ({
    cyan: {
      primary: new THREE.Color(0x00f5d4),  // Cian nuclear #00F5D4
      secondary: new THREE.Color(0x4361ee), // Cobalto / Energía #4361EE
      accent: new THREE.Color(0x7000ff),
    },
    emerald: {
      primary: new THREE.Color(0x00ff9d),
      secondary: new THREE.Color(0x024d31),
      accent: new THREE.Color(0x00f5d4),
    },
    violet: {
      primary: new THREE.Color(0x9d4edd),
      secondary: new THREE.Color(0x4361ee),
      accent: new THREE.Color(0xff007f),
    },
    amber: {
      primary: new THREE.Color(0xffb703),
      secondary: new THREE.Color(0x5c2b00),
      accent: new THREE.Color(0xff0055),
    },
  }), []);

  const currentPalette = colorMap[config.colorScheme] || colorMap.cyan;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: config.distortion },
      uProgress: { value: 0 },
      uVelocity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: currentPalette.secondary },
      uColorB: { value: currentPalette.primary },
      uAccentColor: { value: currentPalette.accent },
      uBloom: { value: config.bloomIntensity },
    }),
    [config.colorScheme, currentPalette, config.distortion, config.bloomIntensity]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      const p = global3DState.progress;
      const v = global3DState.velocity;

      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uProgress.value = p;
      materialRef.current.uniforms.uVelocity.value = v;
      materialRef.current.uniforms.uDistortion.value = config.distortion;
      materialRef.current.uniforms.uBloom.value = config.bloomIntensity;
      materialRef.current.uniforms.uMouse.value.set(global3DState.mouse.x, global3DState.mouse.y);
      materialRef.current.uniforms.uColorA.value = currentPalette.secondary;
      materialRef.current.uniforms.uColorB.value = currentPalette.primary;
      materialRef.current.uniforms.uAccentColor.value = currentPalette.accent;
      materialRef.current.wireframe = config.wireframe;
    }

    if (meshRef.current) {
      const rotSpeed = 0.25 * config.speed + Math.abs(global3DState.velocity) * 0.003;
      meshRef.current.rotation.y += delta * rotSpeed;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.15;

      const p = global3DState.progress;
      if (p < 0.25) {
        const t0 = p / 0.25;
        meshRef.current.scale.setScalar(1 + t0 * 0.2);
      } else if (p < 0.55) {
        const t1 = (p - 0.25) / 0.3;
        meshRef.current.scale.setScalar(1.2 + Math.sin(t1 * Math.PI) * 0.4);
      } else if (p < 0.82) {
        const t2 = (p - 0.55) / 0.27;
        meshRef.current.scale.setScalar(1.6 - t2 * 0.5);
      } else {
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.08);
      }
    }

    if (cageRef.current) {
      const rotSpeed = 0.25 * config.speed + Math.abs(global3DState.velocity) * 0.003;
      cageRef.current.rotation.y -= delta * (rotSpeed * 0.5);
      cageRef.current.rotation.x += delta * (rotSpeed * 0.3);
    }
  });

  return (
    <group>
      {/* Procedural Shader Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.3, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={uniforms}
          transparent
          wireframe={config.wireframe}
        />
      </mesh>

      {/* Outer Protective Geometric Cage */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[2.8, 2]} />
        <meshBasicMaterial
          color={currentPalette.primary}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
};
