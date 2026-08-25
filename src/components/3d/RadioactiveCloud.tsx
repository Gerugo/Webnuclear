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
    cyan: { primary: new THREE.Color(0x00D4B2), secondary: new THREE.Color(0x3B82F6), accent: new THREE.Color(0x60A5FA) },
    emerald: { primary: new THREE.Color(0x10B981), secondary: new THREE.Color(0x00D4B2), accent: new THREE.Color(0x047857) },
    violet: { primary: new THREE.Color(0x8B5CF6), secondary: new THREE.Color(0x3B82F6), accent: new THREE.Color(0xC084FC) },
    amber: { primary: new THREE.Color(0xF59E0B), secondary: new THREE.Color(0xD97706), accent: new THREE.Color(0xFBBF24) },
  }), []);

  const currentPalette = colorMap[config.colorScheme] || colorMap.cyan;

  const count = useMemo(() => Math.floor(10000 * config.particleDensity), [config.particleDensity]);

  const [positions, scales, phaseOffsets] = useMemo(() => {
    const pPositions = new Float32Array(count * 3);
    const pScales = new Float32Array(count);
    const pPhaseOffsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const r = 2.2 + Math.pow(Math.random(), 2.0) * 20.0;

      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);

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

    if (swarmGroupRef.current) {
      swarmGroupRef.current.rotation.x = gsap3DControls.swarmRotationX + Math.sin(elapsedTime * 0.15) * 0.03;
      swarmGroupRef.current.rotation.y = gsap3DControls.swarmRotationY + (elapsedTime * 0.04 * config.speed);
      swarmGroupRef.current.rotation.z = gsap3DControls.swarmRotationZ;
    }

    if (orbitalIsotopesRef.current) {
      orbitalIsotopesRef.current.rotation.y += delta * 0.2 * config.speed;
      orbitalIsotopesRef.current.rotation.z += delta * 0.1;
    }
  });

  const isotopeNodes = useMemo(() => [
    { radius: 4.0, speed: 1.0, scale: 0.2, offset: 0, color: '#00D4B2' },
    { radius: 5.4, speed: 0.8, scale: 0.16, offset: Math.PI * 0.6, color: '#3B82F6' },
    { radius: 6.6, speed: 1.2, scale: 0.22, offset: Math.PI * 1.2, color: '#00D4B2' },
    { radius: 7.8, speed: 0.6, scale: 0.14, offset: Math.PI * 1.8, color: '#10B981' },
  ], []);

  return (
    <group ref={swarmGroupRef}>
      {/* Nube de Partículas de Radioisótopos */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
          <bufferAttribute attach="attributes-aPhaseOffset" args={[phaseOffsets, 1]} />
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

      {/* Emisión Sutil de Destellos Radiactivos */}
      <Sparkles
        count={180}
        scale={[16 * gsap3DControls.particleDispersion, 16 * (1 - gsap3DControls.particleLinearFlow * 0.7), 16]}
        size={2.8}
        speed={0.6 * config.speed}
        color="#00D4B2"
        opacity={0.5}
      />
      <Sparkles
        count={90}
        scale={[10 * gsap3DControls.particleDispersion, 10 * (1 - gsap3DControls.particleLinearFlow * 0.7), 10]}
        size={4.0}
        speed={1.0 * config.speed}
        color="#3B82F6"
        opacity={0.65}
      />

      {/* Nodos de Trazadores Moleculares Flotantes */}
      <group ref={orbitalIsotopesRef}>
        {isotopeNodes.map((node, i) => (
          <group key={i} rotation={[0, node.offset, Math.PI / 4]}>
            <mesh position={[node.radius * gsap3DControls.particleDispersion, Math.sin(node.offset) * 1.2, 0]}>
              <sphereGeometry args={[node.scale * 0.7, 16, 16]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.8} />
            </mesh>
            <mesh position={[node.radius * gsap3DControls.particleDispersion, Math.sin(node.offset) * 1.2, 0]}>
              <sphereGeometry args={[node.scale * 1.4, 16, 16]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.15} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
