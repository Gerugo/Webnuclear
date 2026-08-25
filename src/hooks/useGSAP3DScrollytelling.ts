import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap3DControls } from './useScrollStore';

gsap.registerPlugin(ScrollTrigger);

export function useGSAP3DScrollytelling() {
  useEffect(() => {
    // 1. HERO -> TECNOLOGÍA & RADIOFÁRMACOS: La cámara entra en el núcleo atómico (Macro-Zoom & Revelación Subatómica)
    const tGenesis = gsap.to(gsap3DControls, {
      cameraZ: 3.4,                 // Inmersión macro en el núcleo
      cameraX: 0.9,
      cameraY: 0.4,
      nucleusScale: 1.5,            // Expansión de masa nuclear revelando nucleones
      coreDistortion: 1.9,          // Fluctuación de energía de ligadura
      particleDispersion: 1.4,
      particleLinearFlow: 0.0,      // Mantiene simetría atómica
      swarmRotationY: Math.PI * 0.7,
      ease: 'none',
      scrollTrigger: {
        trigger: '#genesis',
        start: 'top bottom',
        end: 'center center',
        scrub: 1,
      },
    });

    // 2. TECNOLOGÍA -> LOGÍSTICA & VIDA MEDIA: Las partículas forman un flujo lineal continuo (Transporte JIT)
    const tLogistics = gsap.to(gsap3DControls, {
      cameraZ: 5.8,
      cameraX: -2.8,
      cameraY: 1.4,
      particleLinearFlow: 1.0,      // Colapso a haz y flujo vectorial de transporte
      particleDispersion: 2.2,
      swarmRotationZ: 0.45,         // Inclinación direccional de ruta
      nucleusScale: 0.95,
      coreDistortion: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#bio-synth',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.2,
      },
    });

    // 3. LOGÍSTICA -> ÁREAS CLÍNICAS: Inmersión en picado y dispersión celular (Afinidad a Receptores)
    const tClinical = gsap.to(gsap3DControls, {
      cameraZ: -2.2,                // Atravesar el núcleo en picado Z
      cameraX: 0,
      cameraY: 0,
      cameraFov: 80.0,              // Gran angular cinemático
      particleLinearFlow: 0.3,
      particleWarp: 1.9,            // Estiramiento hiperespacial de fotones
      particleDispersion: 3.5,      // Máxima difusión subcelular
      nucleusScale: 0.8,
      ease: 'none',
      scrollTrigger: {
        trigger: '#deep-warp',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.4,
      },
    });

    // 4. ÁREAS CLÍNICAS -> SIMULADOR / SANDBOX: Zoom Out Cenital y Re-estabilización
    const tSandbox = gsap.to(gsap3DControls, {
      cameraZ: 7.8,                 // Zoom out amplio
      cameraX: 0,
      cameraY: 3.5,                 // Perspectiva cenital
      cameraFov: 60.0,
      particleLinearFlow: 0.0,      // Regreso a nube orbital armónica
      particleWarp: 0.0,
      particleDispersion: 1.3,
      nucleusScale: 1.2,
      coreDistortion: 1.2,
      swarmRotationY: Math.PI * 2.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#sandbox',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    // 5. SIMULADOR -> CONTACTO / TERANÓSTICA: Campo Armónico Estabilizado
    const tContact = gsap.to(gsap3DControls, {
      cameraZ: 7.0,
      cameraX: 0,
      cameraY: 0,
      particleDispersion: 1.0,
      particleLinearFlow: 0.0,
      coreDistortion: 0.8,
      ease: 'none',
      scrollTrigger: {
        trigger: '#contacto',
        start: 'top bottom',
        end: 'center center',
        scrub: 1,
      },
    });

    return () => {
      tGenesis.kill();
      tLogistics.kill();
      tClinical.kill();
      tSandbox.kill();
      tContact.kill();
    };
  }, []);
}
