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
  const lastSectionRef = useRef<number>(0);

  useEffect(() => {
    // 1. Configuración de Lenis con respuesta táctil instantánea
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      syncTouch: true, // Sincroniza el scroll en tiempo real mientras el dedo se mueve en pantallas táctiles
    });

    lenisRef.current = lenis;

    const handleScrollUpdate = (p: number, velocity: number = 0) => {
      const clampedP = Math.max(0, Math.min(1, p));
      global3DState.progress = clampedP;
      global3DState.velocity = velocity;

      setScrollProgress(clampedP);
      setScrollVelocity(velocity);

      // Hitos de sección
      const currentSection = clampedP < 0.25 ? 0 : clampedP < 0.5 ? 1 : clampedP < 0.75 ? 2 : 3;
      global3DState.activeSection = currentSection;

      if (currentSection !== lastSectionRef.current) {
        lastSectionRef.current = currentSection;
        soundEngine.playWarpSweep();
      }
    };

    // Sincronizar Lenis con GSAP ScrollTrigger
    lenis.on('scroll', (e: { progress: number; velocity: number; scroll: number; limit: number }) => {
      ScrollTrigger.update();
      handleScrollUpdate(e.progress, e.velocity);
    });

    // Listener nativo pasivo de respaldo para touchmove y scroll para 100% de fluidez en móviles
    const onNativeTouchScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const p = window.scrollY / total;
        handleScrollUpdate(p, 0);
      }
    };

    window.addEventListener('scroll', onNativeTouchScroll, { passive: true });
    window.addEventListener('touchmove', onNativeTouchScroll, { passive: true });

    // Enlazar el render loop de Lenis al ticker optimizado de GSAP
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('scroll', onNativeTouchScroll);
      window.removeEventListener('touchmove', onNativeTouchScroll);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return { lenis: lenisRef.current, scrollProgress, scrollVelocity, scrollTo };
}
