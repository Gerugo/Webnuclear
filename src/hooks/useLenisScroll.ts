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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Sincronizar Lenis con GSAP ScrollTrigger
    lenis.on('scroll', (e: { progress: number; velocity: number; scroll: number; limit: number }) => {
      ScrollTrigger.update();
      const p = Math.max(0, Math.min(1, e.progress));
      global3DState.progress = p;
      global3DState.velocity = e.velocity;

      setScrollProgress(p);
      setScrollVelocity(e.velocity);

      // Detección de hitos en el scroll (4 fases)
      const currentSection = p < 0.22 ? 0 : p < 0.5 ? 1 : p < 0.8 ? 2 : 3;
      global3DState.activeSection = currentSection;

      if (currentSection !== lastSectionRef.current) {
        lastSectionRef.current = currentSection;
        soundEngine.playWarpSweep();
      }
    });

    // Enlazar el render loop de Lenis al ticker optimizado de GSAP
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return { lenis: lenisRef.current, scrollProgress, scrollVelocity, scrollTo };
}
