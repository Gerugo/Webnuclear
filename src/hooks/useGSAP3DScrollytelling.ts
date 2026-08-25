import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap3DControls } from './useScrollStore';

gsap.registerPlugin(ScrollTrigger);

export function useGSAP3DScrollytelling() {
  useEffect(() => {
    // 1. HERO -> TECNOLOGÍA & RADIOFÁRMACOS: Acercamiento a las hebras que inician la unión de bases
    const tGenesis = gsap.to(gsap3DControls, {
      cameraZ: 6.5,
      cameraX: 1.2,
      cameraY: -0.8,
      particleDispersion: 1.1,
      swarmRotationY: Math.PI * 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#genesis',
        start: 'top bottom',
        end: 'center center',
        scrub: 1,
      },
    });

    // 2. TECNOLOGÍA -> LOGÍSTICA & VIDA MEDIA: Flujo y ensamble dinámico de pares A-T / G-C
    const tLogistics = gsap.to(gsap3DControls, {
      cameraZ: 5.2,
      cameraX: -1.4,
      cameraY: -1.8,
      particleDispersion: 1.5,
      swarmRotationZ: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#bio-synth',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.2,
      },
    });

    // 3. LOGÍSTICA -> ÁREAS CLÍNICAS: Recorrido inmersivo por el interior de la hélice de ADN unida
    const tClinical = gsap.to(gsap3DControls, {
      cameraZ: 4.2,
      cameraX: 0.6,
      cameraY: -3.0,
      cameraFov: 65.0,
      particleDispersion: 2.0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#deep-warp',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.4,
      },
    });

    // 4. ÁREAS CLÍNICAS -> SIMULADOR / SANDBOX: Vista general de la cadena bicatenaria completa
    const tSandbox = gsap.to(gsap3DControls, {
      cameraZ: 7.5,
      cameraX: 0,
      cameraY: 0,
      cameraFov: 55.0,
      particleDispersion: 1.2,
      swarmRotationY: Math.PI * 2.0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#sandbox',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    // 5. SIMULADOR -> CONTACTO / ENLACE CLÍNICO: Doble Hélice Estabilizada
    const tContact = gsap.to(gsap3DControls, {
      cameraZ: 6.8,
      cameraX: 0,
      cameraY: 0,
      particleDispersion: 1.0,
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
