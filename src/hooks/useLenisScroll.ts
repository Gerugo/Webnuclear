import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { global3DState } from './useScrollStore';
import { soundEngine } from '../audio/soundSynth';

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const isNavigatingRef = useRef<boolean>(false);
  const currentSectionIdxRef = useRef<number>(0);

  const sectionIds = ['#hero', '#genesis', '#bio-synth', '#deep-warp', '#contacto'];

  useEffect(() => {
    // 1. Configuración de Lenis optimizada para transiciones fluidas de sección
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), // Curva cúbica suave estilo Apple
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    // Sincronizar progreso y detección de sección activa
    lenis.on('scroll', (e: { progress: number; velocity: number; scroll: number; limit: number }) => {
      ScrollTrigger.update();
      const p = Math.max(0, Math.min(1, e.progress));
      global3DState.progress = p;
      global3DState.velocity = e.velocity;

      setScrollProgress(p);
      setScrollVelocity(e.velocity);

      // Mapeo preciso a las 5 secciones principales
      const sectionCount = sectionIds.length;
      const calculatedSection = Math.min(
        sectionCount - 1,
        Math.max(0, Math.floor(p * sectionCount + 0.15))
      );

      if (calculatedSection !== currentSectionIdxRef.current) {
        currentSectionIdxRef.current = calculatedSection;
        global3DState.activeSection = calculatedSection;
        soundEngine.playWarpSweep();
      }
    });

    // Enlazar ticker GSAP
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Sistema de navegación por gestos / rueda (Snapping natural entre secciones)
    let lastWheelTime = 0;
    const handleWheelSnap = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < 1000 || isNavigatingRef.current) return;

      if (Math.abs(e.deltaY) > 25) {
        lastWheelTime = now;
        const direction = e.deltaY > 0 ? 1 : -1;
        const nextIdx = Math.min(
          sectionIds.length - 1,
          Math.max(0, currentSectionIdxRef.current + direction)
        );

        if (nextIdx !== currentSectionIdxRef.current) {
          isNavigatingRef.current = true;
          const targetEl = document.querySelector(sectionIds[nextIdx]);
          if (targetEl) {
            lenis.scrollTo(targetEl as HTMLElement, {
              duration: 1.4,
              onComplete: () => {
                isNavigatingRef.current = false;
              },
            });
          } else {
            isNavigatingRef.current = false;
          }
        }
      }
    };

    // Soporte para gestos táctiles (Swipe Up / Swipe Down en móviles)
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isNavigatingRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffY) > 40) {
        const direction = diffY > 0 ? 1 : -1;
        const nextIdx = Math.min(
          sectionIds.length - 1,
          Math.max(0, currentSectionIdxRef.current + direction)
        );

        if (nextIdx !== currentSectionIdxRef.current) {
          isNavigatingRef.current = true;
          const targetEl = document.querySelector(sectionIds[nextIdx]);
          if (targetEl) {
            lenis.scrollTo(targetEl as HTMLElement, {
              duration: 1.4,
              onComplete: () => {
                isNavigatingRef.current = false;
              },
            });
          } else {
            isNavigatingRef.current = false;
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheelSnap, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheelSnap);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement) => {
    if (lenisRef.current) {
      isNavigatingRef.current = true;
      lenisRef.current.scrollTo(target, {
        duration: 1.4,
        onComplete: () => {
          isNavigatingRef.current = false;
        },
      });
    }
  };

  return { lenis: lenisRef.current, scrollProgress, scrollVelocity, scrollTo };
}
