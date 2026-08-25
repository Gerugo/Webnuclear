import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { coreVertexShader, coreFragmentShader, particleVertexShader, particleFragmentShader } from './shaders';
import { global3DState, type SandboxConfig } from '../../hooks/useScrollStore';

interface ThreeBackgroundProps {
  config: SandboxConfig;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // --- Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010306, 0.025);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Color Palettes ---
    const colorMap = {
      cyan: {
        primary: new THREE.Color(0x00f0ff),
        secondary: new THREE.Color(0x003d73),
        accent: new THREE.Color(0x7000ff),
      },
      emerald: {
        primary: new THREE.Color(0x00ff9d),
        secondary: new THREE.Color(0x024d31),
        accent: new THREE.Color(0x00f0ff),
      },
      violet: {
        primary: new THREE.Color(0x9d4edd),
        secondary: new THREE.Color(0x240046),
        accent: new THREE.Color(0xff007f),
      },
      amber: {
        primary: new THREE.Color(0xffb703),
        secondary: new THREE.Color(0x5c2b00),
        accent: new THREE.Color(0xff0055),
      },
    };

    const currentPalette = colorMap[config.colorScheme] || colorMap.cyan;

    // --- 1. Procedural Core Mesh ---
    const coreGeometry = new THREE.IcosahedronGeometry(2.3, 64);
    const coreMaterial = new THREE.ShaderMaterial({
      vertexShader: coreVertexShader,
      fragmentShader: coreFragmentShader,
      wireframe: config.wireframe,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uDistortion: { value: config.distortion },
        uProgress: { value: 0 },
        uVelocity: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorA: { value: currentPalette.secondary },
        uColorB: { value: currentPalette.primary },
        uAccentColor: { value: currentPalette.accent },
        uBloom: { value: config.bloomIntensity },
      },
    });

    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Outer Wireframe Cage
    const cageGeometry = new THREE.IcosahedronGeometry(2.8, 2);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: currentPalette.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    scene.add(cageMesh);

    // --- 2. Interactive Orbital Cyber Rings ---
    const ringGroup = new THREE.Group();
    const ringCount = 3;
    const rings: THREE.LineLoop[] = [];

    for (let i = 0; i < ringCount; i++) {
      const radius = 3.4 + i * 0.9;
      const ringGeo = new THREE.BufferGeometry();
      const segments = 90;
      const positions = new Float32Array(segments * 3);
      for (let s = 0; s < segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        positions[s * 3] = Math.cos(theta) * radius;
        positions[s * 3 + 1] = Math.sin(theta) * radius;
        positions[s * 3 + 2] = 0;
      }
      ringGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const ringMat = new THREE.LineBasicMaterial({
        color: currentPalette.primary,
        transparent: true,
        opacity: 0.25 - i * 0.05,
      });
      const ring = new THREE.LineLoop(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3 + i * 0.4;
      ring.rotation.y = i * 0.5;
      ringGroup.add(ring);
      rings.push(ring);
    }
    scene.add(ringGroup);

    // --- 3. Neural Particle Cloud (10,000 points) ---
    const particleCount = Math.floor(10000 * config.particleDensity);
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pScales = new Float32Array(particleCount);
    const pPhaseOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      pScales[i] = 0.5 + Math.random() * 1.8;
      pPhaseOffsets[i] = Math.random() * Math.PI * 2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('aScale', new THREE.BufferAttribute(pScales, 1));
    particleGeo.setAttribute('aPhaseOffset', new THREE.BufferAttribute(pPhaseOffsets, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uSpeed: { value: config.speed },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: currentPalette.primary },
        uAccent: { value: currentPalette.accent },
      },
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    // --- 4. Infinite Depth Cyber Floor Grid ---
    const gridHelper = new THREE.GridHelper(80, 80, 0x00f0ff, 0x071b30);
    gridHelper.position.y = -5.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    scene.add(gridHelper);

    const ceilingGrid = new THREE.GridHelper(80, 80, 0x7000ff, 0x071b30);
    ceilingGrid.position.y = 7.5;
    (ceilingGrid.material as THREE.Material).transparent = true;
    (ceilingGrid.material as THREE.Material).opacity = 0.2;
    scene.add(ceilingGrid);

    // --- 5. Lights ---
    const ambientLight = new THREE.AmbientLight(0x020710, 2.0);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(currentPalette.primary.getHex(), 3, 20);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    // --- Animation & Scrollytelling Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const targetCameraPos = new THREE.Vector3(0, 0, 9);
    const targetCameraLookAt = new THREE.Vector3(0, 0, 0);
    const currentCameraLookAt = new THREE.Vector3(0, 0, 0);

    const render = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse coordinates
      global3DState.mouse.x += (global3DState.mouse.targetX - global3DState.mouse.x) * 0.05;
      global3DState.mouse.y += (global3DState.mouse.targetY - global3DState.mouse.y) * 0.05;

      const p = global3DState.progress;
      const v = global3DState.velocity;

      // Update shader uniforms
      coreMaterial.uniforms.uTime.value = elapsedTime;
      coreMaterial.uniforms.uProgress.value = p;
      coreMaterial.uniforms.uVelocity.value = v;
      coreMaterial.uniforms.uDistortion.value = config.distortion;
      coreMaterial.uniforms.uBloom.value = config.bloomIntensity;
      coreMaterial.uniforms.uMouse.value.set(global3DState.mouse.x, global3DState.mouse.y);
      coreMaterial.wireframe = config.wireframe;

      particleMaterial.uniforms.uTime.value = elapsedTime;
      particleMaterial.uniforms.uProgress.value = p;
      particleMaterial.uniforms.uSpeed.value = config.speed;
      particleMaterial.uniforms.uMouse.value.set(global3DState.mouse.x, global3DState.mouse.y);

      // Core rotations
      const rotSpeed = 0.25 * config.speed + Math.abs(v) * 0.003;
      coreMesh.rotation.y += delta * rotSpeed;
      coreMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
      coreMesh.rotation.z = Math.cos(elapsedTime * 0.3) * 0.15;

      cageMesh.rotation.y -= delta * (rotSpeed * 0.5);
      cageMesh.rotation.x += delta * (rotSpeed * 0.3);

      // Ring rotations
      rings.forEach((ring, idx) => {
        ring.rotation.z += delta * (0.15 + idx * 0.08) * (idx % 2 === 0 ? 1 : -1);
        ring.rotation.x += delta * 0.05;
      });

      // Grid tunnel scroll motion
      gridHelper.position.z = (elapsedTime * 4 + p * 30) % 2;
      ceilingGrid.position.z = (elapsedTime * 4 + p * 30) % 2;

      // --- Scrollytelling Choreography ---
      if (p < 0.25) {
        const t0 = p / 0.25;
        targetCameraPos.set(
          global3DState.mouse.x * 1.5,
          global3DState.mouse.y * 1.2,
          9 - t0 * 2.5
        );
        targetCameraLookAt.set(0, 0, 0);
        coreMesh.scale.setScalar(1 + t0 * 0.2);
      } else if (p < 0.55) {
        const t1 = (p - 0.25) / 0.3;
        targetCameraPos.set(
          4.5 * Math.sin(t1 * Math.PI * 0.8) + global3DState.mouse.x * 1.2,
          1.8 + Math.cos(t1 * Math.PI) * 1.2,
          6.5 - t1 * 2.0
        );
        targetCameraLookAt.set(Math.sin(t1 * 2) * 1.2, 0, 0);
        coreMesh.scale.setScalar(1.2 + Math.sin(t1 * Math.PI) * 0.4);
      } else if (p < 0.82) {
        const t2 = (p - 0.55) / 0.27;
        targetCameraPos.set(
          global3DState.mouse.x * 2.5,
          Math.sin(t2 * Math.PI * 2) * 1.5,
          4.5 - t2 * 6.5
        );
        targetCameraLookAt.set(0, 0, -20);
        coreMesh.scale.setScalar(1.6 - t2 * 0.5);
      } else {
        const t3 = (p - 0.82) / 0.18;
        targetCameraPos.set(
          Math.sin(t3 * Math.PI) * 2.5 + global3DState.mouse.x,
          3.5 + t3 * 2.0,
          -2.0 + t3 * 10.0
        );
        targetCameraLookAt.set(0, 0, 0);
        coreMesh.scale.setScalar(1.1 + Math.sin(elapsedTime * 2) * 0.08);
      }

      // Smooth Camera Lerp
      camera.position.lerp(targetCameraPos, 0.08);
      currentCameraLookAt.lerp(targetCameraLookAt, 0.08);
      camera.lookAt(currentCameraLookAt);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      particleGeo.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [config]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
};
