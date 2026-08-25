import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { global3DState, gsap3DControls } from '../../hooks/useScrollStore';

export const CameraRig: React.FC = () => {
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 9));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    // Lerp coordenadas de ratón
    global3DState.mouse.x += (global3DState.mouse.targetX - global3DState.mouse.x) * 0.05;
    global3DState.mouse.y += (global3DState.mouse.targetY - global3DState.mouse.y) * 0.05;

    // Posición objetivo controlada directamente por GSAP ScrollTrigger
    targetCameraPos.current.set(
      gsap3DControls.cameraX + global3DState.mouse.x * 0.75,
      gsap3DControls.cameraY + global3DState.mouse.y * 0.55,
      gsap3DControls.cameraZ // Control de Zoom In / Zoom Out
    );

    // Ajuste de FOV si GSAP modifica el campo de visión
    const persCamera = state.camera as THREE.PerspectiveCamera;
    if (Math.abs(persCamera.fov - gsap3DControls.cameraFov) > 0.1) {
      persCamera.fov = THREE.MathUtils.lerp(persCamera.fov, gsap3DControls.cameraFov, 0.08);
      persCamera.updateProjectionMatrix();
    }

    // Suavizado e interpolación LERP a 60/120 FPS
    state.camera.position.lerp(targetCameraPos.current, 0.08);
    currentLookAt.current.lerp(targetLookAt.current, 0.08);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
};
