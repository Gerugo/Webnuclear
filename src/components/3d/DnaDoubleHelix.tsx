import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { global3DState, type SandboxConfig } from '../../hooks/useScrollStore';

interface DnaDoubleHelixProps {
  config: SandboxConfig;
}

export const DnaDoubleHelix: React.FC<DnaDoubleHelixProps> = ({ config }) => {
  const groupRef = useRef<THREE.Group>(null);
  const rungsGroupRef = useRef<THREE.Group>(null);

  // Parámetros de la Doble Hélice de ADN
  const rungCount = 54;
  const height = 38;
  const radius = 2.6;
  const turns = 3.8;

  // Generación de la geometría y coordenadas de los pares de bases
  const rungsData = useMemo(() => {
    const data = [];
    for (let i = 0; i < rungCount; i++) {
      const fraction = i / (rungCount - 1);
      const angle = fraction * Math.PI * 2 * turns;
      const y = (fraction - 0.5) * height;

      // Posiciones de la Hebra A y Hebra B en reposo enrollado
      const xA = Math.cos(angle) * radius;
      const zA = Math.sin(angle) * radius;

      const xB = Math.cos(angle + Math.PI) * radius;
      const zB = Math.sin(angle + Math.PI) * radius;

      // Asignación de tipos de bases nitrogenadas (A-T, G-C)
      const baseType = i % 4; // 0: Adenina, 1: Timina, 2: Guanina, 3: Citosina

      data.push({
        index: i,
        fraction,
        angle,
        y,
        posA: new THREE.Vector3(xA, y, zA),
        posB: new THREE.Vector3(xB, y, zB),
        baseType,
      });
    }
    return data;
  }, [rungCount, height, radius, turns]);

  // Color Mapping según la configuración de Sandbox
  const colorPalette = useMemo(() => {
    switch (config.colorScheme) {
      case 'emerald':
        return {
          strandA: new THREE.Color(0x059669),
          strandB: new THREE.Color(0x0d9488),
          baseA: new THREE.Color(0x10b981),
          baseB: new THREE.Color(0x34d399),
          bond: new THREE.Color(0x6ee7b7),
        };
      case 'violet':
        return {
          strandA: new THREE.Color(0x7c3aed),
          strandB: new THREE.Color(0x2563eb),
          baseA: new THREE.Color(0x8b5cf6),
          baseB: new THREE.Color(0x60a5fa),
          bond: new THREE.Color(0xc084fc),
        };
      case 'amber':
        return {
          strandA: new THREE.Color(0xd97706),
          strandB: new THREE.Color(0x2563eb),
          baseA: new THREE.Color(0xf59e0b),
          baseB: new THREE.Color(0x38bdf8),
          bond: new THREE.Color(0xfde68a),
        };
      case 'cyan':
      default:
        return {
          strandA: new THREE.Color(0x0d9488), // Teal / Cian Médico
          strandB: new THREE.Color(0x2563eb), // Azul Cobalto Salud
          baseA: new THREE.Color(0x06b6d4),   // Cian brillante
          baseB: new THREE.Color(0x3b82f6),   // Azul bio-energía
          bond: new THREE.Color(0x5eead4),    // Enlace de hidrógeno luminoso
        };
    }
  }, [config.colorScheme]);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    const progress = global3DState.progress; // 0.0 en Hero -> 1.0 en Footer

    if (groupRef.current) {
      // Rotación suave continua de la hélice
      groupRef.current.rotation.y += delta * 0.35 * config.speed;
      groupRef.current.rotation.z = Math.sin(elapsedTime * 0.3) * 0.05;
      
      // Desplazamiento vertical reactivo al scroll para navegar a lo largo de la hélice
      groupRef.current.position.y = -progress * 14 + Math.sin(elapsedTime * 0.5) * 0.2;
    }

    // Actualización de la hibridación / unión de cada par de bases
    if (rungsGroupRef.current) {
      rungsGroupRef.current.children.forEach((child, idx) => {
        const rung = rungsData[idx];
        if (!rung) return;

        // Factor de ensamble progresivo según el scroll
        // A medida que el usuario baja, las bases se van uniendo secuencialmente
        const activationThreshold = rung.fraction * 0.75;
        const joinProgress = THREE.MathUtils.smoothstep(progress * 1.35, activationThreshold, activationThreshold + 0.35);

        // Los dos brazos del par de bases y el enlace central
        const nodeA = child.children[0] as THREE.Mesh;
        const nodeB = child.children[1] as THREE.Mesh;
        const bondMesh = child.children[2] as THREE.Mesh;

        // Separación inicial cuando no está unido (apertura lateral)
        const unzippedSpread = (1 - joinProgress) * 3.5;
        
        const dirA = new THREE.Vector3(Math.cos(rung.angle), 0, Math.sin(rung.angle)).normalize();
        const dirB = dirA.clone().negate();

        if (nodeA) {
          nodeA.position.set(
            rung.posA.x + dirA.x * unzippedSpread,
            rung.posA.y,
            rung.posA.z + dirA.z * unzippedSpread
          );
        }

        if (nodeB) {
          nodeB.position.set(
            rung.posB.x + dirB.x * unzippedSpread,
            rung.posB.y,
            rung.posB.z + dirB.z * unzippedSpread
          );
        }

        // El puente de enlace (puente de hidrógeno) aparece y se estira conforme se unen
        if (bondMesh) {
          const currentA = nodeA.position;
          const currentB = nodeB.position;
          
          bondMesh.position.lerpVectors(currentA, currentB, 0.5);
          
          const distance = currentA.distanceTo(currentB);
          bondMesh.scale.set(joinProgress, distance, joinProgress);
          bondMesh.lookAt(currentA);
          bondMesh.rotateX(Math.PI / 2);
          
          // Material reactivo
          const mat = bondMesh.material as THREE.MeshBasicMaterial;
          if (mat) {
            mat.opacity = 0.2 + joinProgress * 0.75;
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Grupo de Pares de Bases Nitrogenadas y Enlaces de Hidrógeno */}
      <group ref={rungsGroupRef}>
        {rungsData.map((rung, i) => (
          <group key={i}>
            {/* Nodo Nucleótido Hebra A */}
            <mesh position={rung.posA}>
              <sphereGeometry args={[0.26, 20, 20]} />
              <meshStandardMaterial
                color={colorPalette.strandA}
                roughness={0.2}
                metalness={0.3}
                emissive={colorPalette.baseA}
                emissiveIntensity={0.25 * config.bloomIntensity}
              />
            </mesh>

            {/* Nodo Nucleótido Hebra B */}
            <mesh position={rung.posB}>
              <sphereGeometry args={[0.26, 20, 20]} />
              <meshStandardMaterial
                color={colorPalette.strandB}
                roughness={0.2}
                metalness={0.3}
                emissive={colorPalette.baseB}
                emissiveIntensity={0.25 * config.bloomIntensity}
              />
            </mesh>

            {/* Puente de Enlace / Par de Bases que se une con el Scroll */}
            <mesh position={[0, rung.y, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 1, 16]} />
              <meshBasicMaterial
                color={colorPalette.bond}
                transparent
                opacity={0.8}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Trazadores Moleculares y Radionucleidos Flotantes alrededor de la Hélice */}
      <Sparkles
        count={120}
        scale={[10, 36, 10]}
        size={3.2}
        speed={0.8 * config.speed}
        color="#0D9488"
        opacity={0.45}
      />
      <Sparkles
        count={80}
        scale={[8, 30, 8]}
        size={4.0}
        speed={1.2 * config.speed}
        color="#2563EB"
        opacity={0.5}
      />
    </group>
  );
};
