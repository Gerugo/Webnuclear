import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { particleVertexShader, particleFragmentShader } from './shaders';
import { global3DState, gsap3DControls, type SandboxConfig } from '../../hooks/useScrollStore';

interface RadioactiveCloudProps {
  config: SandboxConfig;
}

export const RadioactiveCloud: React.FC<RadioactiveCloudProps> = ({ config }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const orbitalIsotopesRef = useRef<THREE.Group>(null);
  const swarmGroupRef = useRef<THREE.Group>(null);

  const colorMap = useMemo(() => ({
    cyan: { primary: new THREE.Color(0x00f5d4), secondary: new THREE.Color(0x4361ee), accent: new THREE.Color(0x7000ff) },
    emerald: { primary: new THREE.Color(0x00ff9d), secondary: new THREE.Color(0x00f5d4), accent: new THREE.Color(0x024d31) },
    violet: { primary: new THREE.Color(0x9d4edd), secondary: new THREE.Color(0x4361ee), accent: new THREE.Color(0xff007f) },
    amber: { primary: new THREE.Color(0xffb703), secondary: new THREE.Color(0xff5400), accent: new THREE.Color(0xff0055) },
  }), []);

  const currentPalette = colorMap[config.colorScheme] || colorMap.cyan;

  const count = useMemo(() => Math.floor(12000 * config.particleDensity), [config.particleDensity]);

  const [positions, scales, phaseOffsets] = useMemo(() => {
    const pPositions = new Float32Array(count * 3);
    const pScales = new Float32Array(count);
    const pPhaseOffsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const r = 2.0 + Math.pow(Math.random(), 2.2) * 22.0;

      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);

      pScales[i] = 0.6 + Math.random() * 2.2;
      pPhaseOffsets[i] = Math.random() * Math.PI * 2;
    }

    return [pPositions, pScales, pPhaseOffsets];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSpeed: { value: config.speed },
      uDispersion: { value: gsap3DControls.particleDispersion },
      uLinearFlow: { value: gsap3DControls.particleLinearFlow },
      uWarp: { value: gsap3DControls.particleWarp },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: currentPalette.primary },
      uAccent: { value: currentPalette.secondary },
    }),
    [config.speed, currentPalette]
  );

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    const p = global3DState.progress;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime;
      materialRef.current.uniforms.uProgress.value = p;
      materialRef.current.uniforms.uSpeed.value = config.speed;
      materialRef.current.uniforms.uDispersion.value = gsap3DControls.particleDispersion;
      materialRef.current.uniforms.uLinearFlow.value = gsap3DControls.particleLinearFlow;
      materialRef.current.uniforms.uWarp.value = gsap3DControls.particleWarp;
      materialRef.current.uniforms.uMouse.value.set(global3DState.mouse.x, global3DState.mouse.y);
      materialRef.current.uniforms.uColor.value = currentPalette.primary;
      materialRef.current.uniforms.uAccent.value = currentPalette.secondary;
    }

    // Rotación del enjambre gobernada por GSAP
    if (swarmGroupRef.current) {
      swarmGroupRef.current.rotation.x = gsap3DControls.swarmRotationX + Math.sin(elapsedTime * 0.2) * 0.05;
      swarmGroupRef.current.rotation.y = gsap3DControls.swarmRotationY + (elapsedTime * 0.06 * config.speed);
      swarmGroupRef.current.rotation.z = gsap3DControls.swarmRotationZ;
    }

    // Nodos orbitales
    if (orbitalIsotopesRef.current) {
      orbitalIsotopesRef.current.rotation.y += delta * 0.3 * config.speed;
      orbitalIsotopesRef.current.rotation.z += delta * 0.15;
    }
  });

  const isotopeNodes = useMemo(() => [
    { radius: 4.2, speed: 1.2, scale: 0.22, offset: 0, color: '#00F5D4' },
    { radius: 5.6, speed: 0.9, scale: 0.18, offset: Math.PI * 0.6, color: '#4361EE' },
    { radius: 6.8, speed: 1.5, scale: 0.26, offset: Math.PI * 1.2, color: '#00F5D4' },
    { radius: 8.2, speed: 0.7, scale: 0.15, offset: Math.PI * 1.8, color: '#9d4edd' },
  ], []);

  return (
    <group ref={swarmGroupRef}>
      {/* 1. Nube de Partículas Cuánticas con Flujo Lineal / Radial */}
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

      {/* 2. Sparkles de Radiación */}
      <Sparkles
        count={250}
        scale={[16 * gsap3DControls.particleDispersion, 16 * (1 - gsap3DControls.particleLinearFlow * 0.7), 16]}
        size={3.5}
        speed={0.8 * config.speed}
        color="#00F5D4"
        opacity={0.65}
      />
      <Sparkles
        count={120}
        scale={[10 * gsap3DControls.particleDispersion, 10 * (1 - gsap3DControls.particleLinearFlow * 0.7), 10]}
        size={5.0}
        speed={1.4 * config.speed}
        color="#4361EE"
        opacity={0.8}
      />

      {/* 3. Nodos de Radioisótopos Flotantes */}
      <group ref={orbitalIsotopesRef}>
        {isotopeNodes.map((node, i) => (
          <group key={i} rotation={[0, node.offset, Math.PI / 4]}>
            <mesh position={[node.radius * gsap3DControls.particleDispersion, Math.sin(node.offset) * 1.5, 0]}>
              <octahedronGeometry args={[node.scale, 0]} />
              <meshBasicMaterial
                color={node.color}
                wireframe
                transparent
                opacity={0.85}
              />
            </mesh>
            <mesh position={[node.radius * gsap3DControls.particleDispersion, Math.sin(node.offset) * 1.5, 0]}>
              <sphereGeometry args={[node.scale * 0.45, 16, 16]} />
              <meshBasicMaterial color={node.color} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
