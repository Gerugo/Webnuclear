import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { coreVertexShader, coreFragmentShader } from './shaders';
import { global3DState, gsap3DControls, type SandboxConfig } from '../../hooks/useScrollStore';

interface AtomicNucleusProps {
  config: SandboxConfig;
}

export const AtomicNucleus: React.FC<AtomicNucleusProps> = ({ config }) => {
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const nucleonsGroupRef = useRef<THREE.Group>(null);
  const orbitalTorusesRef = useRef<THREE.Group>(null);

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

  const nucleons = useMemo(() => {
    const arr = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const phi = (i % 2 === 0 ? 1 : -1) * 0.6;
      const r = 0.9;
      arr.push({
        pos: [
          r * Math.cos(theta) * Math.cos(phi),
          r * Math.sin(phi),
          r * Math.sin(theta) * Math.cos(phi),
        ] as [number, number, number],
        isProton: i % 2 === 0,
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    const p = global3DState.progress;
    const v = global3DState.velocity;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime;
      materialRef.current.uniforms.uProgress.value = p;
      materialRef.current.uniforms.uVelocity.value = v;
      materialRef.current.uniforms.uDistortion.value = config.distortion * gsap3DControls.coreDistortion;
      materialRef.current.uniforms.uBloom.value = config.bloomIntensity;
      materialRef.current.uniforms.uMouse.value.set(global3DState.mouse.x, global3DState.mouse.y);
      materialRef.current.uniforms.uColorA.value = currentPalette.secondary;
      materialRef.current.uniforms.uColorB.value = currentPalette.primary;
      materialRef.current.uniforms.uAccentColor.value = currentPalette.accent;
      materialRef.current.wireframe = config.wireframe;
    }

    if (coreMeshRef.current) {
      const rotSpeed = 0.25 * config.speed + Math.abs(v) * 0.003;
      coreMeshRef.current.rotation.y += delta * rotSpeed;
      coreMeshRef.current.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
      coreMeshRef.current.rotation.z = Math.cos(elapsedTime * 0.3) * 0.15;

      // Escala gobernada por GSAP
      const targetScale = gsap3DControls.nucleusScale * (1 + Math.sin(elapsedTime * 2) * 0.04);
      coreMeshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    if (nucleonsGroupRef.current) {
      nucleonsGroupRef.current.rotation.y -= delta * 0.4 * config.speed;
      nucleonsGroupRef.current.rotation.z += delta * 0.2;
    }

    if (cageRef.current) {
      const rotSpeed = 0.25 * config.speed + Math.abs(v) * 0.003;
      cageRef.current.rotation.y -= delta * (rotSpeed * 0.5);
      cageRef.current.rotation.x += delta * (rotSpeed * 0.3);
      cageRef.current.scale.copy(coreMeshRef.current ? coreMeshRef.current.scale : new THREE.Vector3(1, 1, 1));
    }

    if (orbitalTorusesRef.current) {
      orbitalTorusesRef.current.children.forEach((child, idx) => {
        child.rotation.x += delta * (0.3 + idx * 0.1) * (idx % 2 === 0 ? 1 : -1);
        child.rotation.y += delta * (0.25 + idx * 0.15);
      });
    }
  });

  return (
    <group>
      {/* 1. Malla Central del Núcleo Atómico con Shaders GLSL */}
      <mesh ref={coreMeshRef}>
        <icosahedronGeometry args={[2.2, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={uniforms}
          transparent
          wireframe={config.wireframe}
        />
      </mesh>

      {/* 2. Clúster de Nucleones Subatómicos */}
      <group ref={nucleonsGroupRef}>
        {nucleons.map((n, idx) => (
          <mesh key={idx} position={n.pos}>
            <sphereGeometry args={[0.38, 16, 16]} />
            <meshBasicMaterial
              color={n.isProton ? '#00F5D4' : '#4361EE'}
              wireframe
              transparent
              opacity={0.45}
            />
          </mesh>
        ))}
      </group>

      {/* 3. Jaula Geométrica de Confinamiento Electromagnético */}
      <mesh ref={cageRef}>
        <dodecahedronGeometry args={[2.9, 1]} />
        <meshBasicMaterial
          color={currentPalette.primary}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* 4. Toroides Orbitales de Flujo Cuántico */}
      <group ref={orbitalTorusesRef}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[3.6, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00F5D4" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[4.2, 0.012, 16, 100]} />
          <meshBasicMaterial color="#4361EE" transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[0, -Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[4.8, 0.01, 16, 100]} />
          <meshBasicMaterial color="#00F5D4" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
};
