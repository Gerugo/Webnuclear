export interface SandboxConfig {
  speed: number;
  distortion: number;
  particleDensity: number;
  wireframe: boolean;
  colorScheme: 'cyan' | 'emerald' | 'violet' | 'amber';
  bloomIntensity: number;
}

export const defaultSandboxConfig: SandboxConfig = {
  speed: 1.0,
  distortion: 1.2,
  particleDensity: 1.0,
  wireframe: false,
  colorScheme: 'cyan',
  bloomIntensity: 1.5,
};

export interface Global3DState {
  progress: number;
  velocity: number;
  mouse: { x: number; y: number; targetX: number; targetY: number };
  activeSection: number;
}

export const global3DState: Global3DState = {
  progress: 0,
  velocity: 0,
  mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
  activeSection: 0,
};

// Objeto de Parámetros 3D expuesto directamente para manipulación y scrubbing con GSAP ScrollTrigger
export interface GSAP3DControls {
  // Posición y Zoom de la Cámara
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  cameraFov: number;
  
  // Rotación del Enjambre
  swarmRotationX: number;
  swarmRotationY: number;
  swarmRotationZ: number;
  
  // Modulación Morfogenética y Flujo
  particleDispersion: number;
  particleLinearFlow: number; // 0.0 = Nube esférica, 1.0 = Flujo lineal de transporte JIT
  particleWarp: number;       // 0.0 = Reposo, 2.0 = Hiper-túnel
  nucleusScale: number;       // Tamaño del núcleo atómico
  coreDistortion: number;     // Deformación de masa por ruido GLSL
}

export const gsap3DControls: GSAP3DControls = {
  cameraX: 0,
  cameraY: 0,
  cameraZ: 9.0, // Hero: Átomo compacto lejano
  cameraFov: 60.0,

  swarmRotationX: 0,
  swarmRotationY: 0,
  swarmRotationZ: 0,

  particleDispersion: 0.7, // Hero: Enjambre compacto
  particleLinearFlow: 0.0, // Hero: Órbita radial
  particleWarp: 0.0,
  nucleusScale: 1.0,
  coreDistortion: 0.6,
};

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    global3DState.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    global3DState.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}
